window.onload = conn;

async function conn(){
        
    url = "http://localhost:3000/";
    let estatesResponse = await fetch(url, {
        method: 'GET',        
        });        
    let estateList = await estatesResponse.json();
    
    renderEstates(estateList);    

}

function renderEstates(estateList){        

    let eladoHTML = "";
    let kiadoHTML = "";
    let kepek="";    

    if(estateList.length>0){
        for(let i=0; i < estateList.length; i++){        
            if(estateList[i].kepek > 0){
                kepek="http://localhost:3000/kepek/"+ estateList[i].tmp + "/" + estateList[i].userid + "/" + estateList[i].hirdetesazon +"/100.jpg";
            }        
            else{
                kepek="/images/OIG.jpg";
            }
            
            let tmp;

            if(estateList[i].tmp === "Elado"){
                ar=estateList[i].ar*1000000;
                tmp=1;

                eladoHTML += `           
                    <div class="renderEstate" onclick="megjelenit(${estateList[i].hirdetesazon}, ${tmp}, ${estateList[i].userid})">
                        <div class="renderEstateHol"><h2>${estateList[i].varos},</h2><h3>${estateList[i].utcanev} ${estateList[i].kozterulet} ${estateList[i].hazszam}.</h3></div>
                        <div class="renderEstateAdatok">     
                            <div class="renderEstateImage" style="background-image: url(${kepek}");></div>
                            <div class="renderEstateAdat">    
                                <div class="renderEstateAr">${ar.toLocaleString("de-DE")} Ft</div>
                                <div class="renderEstateTipus">${estateList[i].tipus}</div>       
                                <div class="renderEstateAlapterulet">${estateList[i].alapterulet} m&sup2</div>
                                <div class="renderEstateSzobaszam">${estateList[i].szobaszam} szoba</div> 
                            </div>
                        </div>
                    </div>
                `;
            }
            else{
                ar=estateList[i].ar*1000;
                tmp=2;

                kiadoHTML += `            
                    <div class="renderEstate" onclick="megjelenit(${estateList[i].hirdetesazon}, ${tmp}, ${estateList[i].userid})">
                        <div class="renderEstateHol">${estateList[i].varos}, ${estateList[i].utcanev} ${estateList[i].kozterulet} ${estateList[i].hazszam}.</div>
                        <div class="renderEstateAdatok">     
                            <div class="renderEstateImage" style="background-image: url(${kepek}");></div>
                            <div class="renderEstateAdat">    
                                <div class="renderEstateAr">${ar.toLocaleString("de-DE")} Ft</div>
                                <div class="renderEstateTipus">${estateList[i].tipus}</div>       
                                <div class="renderEstateAlapterulet">${estateList[i].alapterulet} m&sup2</div>
                                <div class="renderEstateSzobaszam">${estateList[i].szobaszam} szoba</div> 
                            </div>
                        </div>
                    </div>
                `;
            }         
        }
        document.getElementById("eladoEstate").innerHTML += eladoHTML;
        document.getElementById("kiadoEstate").innerHTML += kiadoHTML; 
    }
    else{
        document.getElementById("eladoEstate").innerHTML = "";
        document.getElementById("kiadoEstate").innerHTML = ""; 
        document.getElementById("mainEstates").innerHTML = "<h1>Nincs megjeleníthető hirdetés.</h1>"
    }
     
      
}

function megjelenit(id, tmp, userId){

    window.open('megjelenit.html?hirdId=' + id + '&tmp=' + tmp + '&temp=' + userId);
    
}

