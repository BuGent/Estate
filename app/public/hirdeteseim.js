window.onload = conn;

async function conn(){
        
    const body = {
        "id": userId
      };
    let estateList = await fetch('http://localhost:3000/hirdeteseim', {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(body)
    });
    
    estateList = await estateList.json();
    renderEstates(estateList);

}

function renderEstates(estateList){    

    let estatesHTML = "";
    let kepek="";
    let ar;    

    if(estateList.length===0){
        estatesHTML = "<h1>Nincs megjeleníthető hirdetése.</h1>"
    }
    else{
        for(let i=0; i < estateList.length; i++){        
            if(estateList[i].kepek > 0){
                kepek="http://localhost:3000/kepek/"+ estateList[i].tmp + "/" + estateList[i].userid + "/" + estateList[i].hirdetesazon +"/100.jpg";
            }        
            else{
                kepek="/images/OIG.jpg";
            }
            
            if(estateList[i].tmp === "Elado"){
                ar = estateList[i].ar * 1000000;
            }
            else{
                ar = estateList[i].ar * 1000;
            }
            estatesHTML += `            
                <div class="myEstate">
                    <div class="myEstateImage" style="background-image: url(${kepek}");>         
                    </div>
                    <div>
                        <div class="myEstateAdat">    
                            <div class="myEstateHol">${estateList[i].varos}, <br> ${estateList[i].utcanev} ${estateList[i].kozterulet} ${estateList[i].hazszam}.
                            </div>
                            <div class="myEstateAr">${ar.toLocaleString("de-DE")} Ft
                            </div>            
                            <div class="myEstateMiben">${estateList[i].tmp}
                            </div>
                        </div>
                        <div id=estateGombok>
                        <button class="editBtn" id="editBtn" data-editbtnid=${i}>Módosít</button>
                        <button class="deleteBtn" id="deleteBtn" data-deletebtnid=${i}>Törlés</button>                    
                        </div>
                    </div>    
                </div>  
            `;      
        }
    }

    document.getElementById("myEstates").innerHTML = estatesHTML ;

    for(let deleteBtn of document.querySelectorAll('.deleteBtn')){
        deleteBtn.onclick = function (event) {

            delId=event.target.dataset.deletebtnid;            
            
            del(estateList[delId].tmp, estateList[delId].hirdetesazon, estateList[delId].userid, estateList[delId].kepek);         
            
        }
    }
    
    for(let editBtn of document.querySelectorAll('.editBtn')){
        editBtn.onclick = function (event) {

            editId=event.target.dataset.editbtnid;
            let tmp;
            if(estateList[editId].tmp === "Elado"){
                tmp = 1;
            }
            else{
                tmp = 2;
            }
          
            window.open('modosit.php?hirdId=' + estateList[editId].hirdetesazon + '&tmp=' + tmp + '&temp=' + estateList[editId].userid + '&pic=' + estateList[editId].kepek);
            
        }
    }

}

async function del(miben, hirdetesazon, userId, kepek){

    const body = {
        "miben": miben,
        "hirdetesazon": hirdetesazon,
        "userId": userId,
        "kepek": kepek
      };
    let result = await fetch('http://localhost:3000/torol', {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(body)
    });

    result = await result.json();
    
    if(result === 1){
        alert("A hirdetés sikeresen törlésre került"); 
        location.href = "http://localhost/hirdeteseim.php";
    }        
    else
    alert("Hiba történt, a hirdetés törlése közben.");

}