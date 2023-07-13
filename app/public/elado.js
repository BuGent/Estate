window.onload = conn;

let lastProp = 0;

async function conn(){

    let estateList = await fetch('http://localhost:3000/frisseladoak', {
        method: 'GET',
        headers: {
            "Content-Type": 'application/json'
        }        
    });           
    estateList = await estateList.json();
    
    let hossz;
    if (estateList.length == 13){
        hossz = 12;
    }
    else{
        hossz = estateList.length
    }

    document.getElementById("eladoEstates").innerHTML =  renderEstates(estateList, hossz);
    if (estateList.length == 13){
        document.getElementById("more").innerHTML =  '<button type="button" id="loadMore">Több betöltése</button>';
        loadMore();
    } 

}

function loadMore() {

    document.getElementById('loadMore').onclick = async function(){
        lastProp++;

        const body = {
            "utolso": lastProp
        };
        let nextList = await fetch('http://localhost:3000/frisseladoak', {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(body)
        });

        nextList = await nextList.json();
        
        let hossz;
        if (nextList.length == 13){
            hossz = 12;
        }
        else{
            hossz = nextList.length
        }
        document.getElementById("eladoEstates").innerHTML +=  renderEstates(nextList, hossz);
        if (nextList.length == 13){
            document.getElementById("more").innerHTML =  '<button type="button" id="loadMore">Több betöltése</button>';
            loadMore();
        }
        else{
            document.getElementById("more").innerHTML =  '';
        }       
    };

}

document.getElementById('eladForm').onsubmit = async function (event){ 

    event.preventDefault();
    lastProp=0;
    document.getElementById("more").innerHTML =  '';        
     
    let tipus = event.target.elements.tipus.value;
    let telepules = sanitizeString(event.target.elements.telepules.value);
    let min = Number(event.target.elements.minimum.value);
    let max = Number(event.target.elements.maximum.value);    
        
    const body = {
        "tipus": tipus,
        "telepules": telepules,
        "min": min,
        "max": max,
        "utolso": lastProp
      };

    let szurtList = await fetch('http://localhost:3000/elado', {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(body)
    });

    szurtList = await szurtList.json();

    if (szurtList.length === 0){
        document.getElementById("eladoEstates").innerHTML = "<p>Nincs megjeleníthető találat.</p>"
    }
    else{
        let hossz;
        if (szurtList.length == 13){
            hossz = 12;
        }
        else{
            hossz = szurtList.length
        }

        document.getElementById("eladoEstates").innerHTML =  renderEstates(szurtList, hossz);
        if (szurtList.length == 13){
            document.getElementById("more").innerHTML =  '<button type="button" id="loadMore">Több betöltése</button>';
            szurLoadMore(tipus, telepules, min, max);
        }
    }
    

};

function szurLoadMore(tipus, telepules, min, max) {     
    
    document.getElementById('loadMore').onclick = async function(){
        lastProp++;

        const body = {
            "tipus": tipus,
            "telepules": telepules,
            "min": min,
            "max": max,
            "utolso": lastProp
        };
        let nextSzurtList = await fetch('http://localhost:3000/elado', {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(body)
        });

        nextSzurtList = await nextSzurtList.json();
        
        let hossz;
        if (nextSzurtList.length == 13){
            hossz = 12;
        }
        else{
            hossz = nextSzurtList.length
        }
        document.getElementById("eladoEstates").innerHTML +=  renderEstates(nextSzurtList, hossz);
        if (nextSzurtList.length == 13){
            document.getElementById("more").innerHTML =  '<button type="button" id="loadMore">Több betöltése</button>';
            szurLoadMore();
        }
        else{
            document.getElementById("more").innerHTML =  '';
        }       
    };

}

   
   
function renderEstates(estateList, hossz){   

    let estatesHTML = "";
    let kepek="";
    for(let i=0; i < hossz; i++){
   
        if(estateList[i].kepek > 0){
            kepek="http://localhost:3000/kepek/Elado/" + estateList[i].userid + "/" + estateList[i].hirdetesazon +"/100.jpg";
        }        
        else{
            kepek="/images/OIG.jpg";
        }
    
        estatesHTML += `           
            <div class="renderEstate" onclick="megjelenit(${estateList[i].hirdetesazon}, ${1}, ${estateList[i].userid})">
                <div class="renderEstateHol"><h2>${estateList[i].varos},</h2><h3>${estateList[i].utcanev} ${estateList[i].kozterulet} ${estateList[i].hazszam}.</h3></div>
                <div class="renderEstateAdatok">     
                    <div class="renderEstateImage" style="background-image: url(${kepek}");></div>
                    <div class="renderEstateAdat">    
                        <div class="renderEstateAr">${((estateList[i].ar)*1000000).toLocaleString("de-DE")} Ft</div>
                        <div class="renderEstateTipus">${estateList[i].tipus}</div>       
                        <div class="renderEstateAlapterulet">${estateList[i].alapterulet} m&sup2</div>
                        <div class="renderEstateSzobaszam">${estateList[i].szobaszam} szoba</div> 
                    </div>
                </div> 
            </div> 
           `;      
    }
    return estatesHTML; 

}

function sanitizeString(str){

    str = str.replace(/[^a-z0-9áéíőöüóúüű \.,_-]/gim,"");
    return str.trim();

}

function megjelenit(id, tmp, userId){

    window.open('megjelenit.html?hirdId=' + id + '&tmp=' + tmp + '&temp=' + userId);
    
}