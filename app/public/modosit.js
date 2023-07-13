window.onload = function() {

    queryString = window.location.search;
    urlParams = new URLSearchParams(queryString);
    let hirdetesazon = urlParams.get('hirdId');
    let tmp = urlParams.get('tmp');
    let userId = urlParams.get('temp');
    let kepekSzama = urlParams.get('pic');
    let miben;
    let tipus;
    
    if (tmp == 1){
        miben = "Elado";
        tipus = "Eladó";
    }
    else{
        miben = "Kiado";
        tipus = "Kiadó"; 
    }

    renderKepek(miben, hirdetesazon, userId, kepekSzama); 

}

function renderKepek(miben, hirdetesazon, userId, kepekSzama){

    let kepekHTML = "";
    let kepUrl ="";
    let kepNev = 100;    
    
    for(let i=0; i<kepekSzama; i++){
        kepUrl="http://localhost:3000/kepek/" + miben + "/" + userId + "/" + hirdetesazon + "/" + kepNev + ".jpg?v=" + Date.now();
        if(kepNev === 100){
            kepekHTML += `          
                <div class="kepeim">
                    <div class="kepem"  style="background-image: url('${kepUrl}');"></div>
                    <button onclick="delPic('${miben}', '${userId}', ${hirdetesazon}, ${kepNev})" class="deletePic" data-deletepicid=${i}>Törlés</button>
                </div>
            `;
        }
        else{
            kepekHTML += `          
                <div class="kepeim">
                    <div class="kepem"  style="background-image: url('${kepUrl}');"></div>
                    <button onclick="delPic('${miben}', '${userId}', ${hirdetesazon}, ${kepNev})" class="deletePic" data-deletepicid=${i}>Törlés</button>
                    <button onclick="mainPic('${miben}', '${userId}', ${hirdetesazon}, ${kepNev})" class="mainPic" data-mainpicid=${i}>Fő képnek</button>
                </div>
            `;            
        }
        kepNev++;
    }
        
    document.getElementById("kepEdit").innerHTML = kepekHTML ;        
}

async function delPic(miben, userId, hirdetesazon, kepSzam){
       
    const body = {
        "miben": miben,
        "userId": userId,
        "hirdetesazon": hirdetesazon,
        "kepSzam": kepSzam,
        };    
    let response = await fetch('http://localhost:3000/keptorol', {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(body)
    });   

    response = await response.json();
    
    if(response != -1){
        const newURL = updateURLParameter(window.location.href, 'pic', response);
        history.pushState(null, null, newURL);
        document.getElementById("kepEdit").innerHTML = "" ;
        renderKepek(miben, hirdetesazon, userId, response);
    
        
    }
    else{
        console.log("nem oké");
    }

};


function updateURLParameter(url, param, value) {

    const pattern = new RegExp('(' + param + '=).*?(&|$)');

    if (url.search(pattern) >= 0) {
      return url.replace(pattern, '$1' + value + '$2');
    }

    return url + (url.indexOf('?') > 0 ? '&' : '?') + param + '=' + value;

}

async function mainPic(miben, userId, hirdetesazon, kepSzam){
       
    const body = {
        "miben": miben,
        "userId": userId,
        "hirdetesazon": hirdetesazon,
        "kepSzam": kepSzam,
        };    
    let response = await fetch('http://localhost:3000/kepelso', {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(body)
    });   

    response = await response.json();

    if(response != -1){
        console.log(response);
        location.reload();
    }
    else{
        console.log("nem oké");
    }

};

document.getElementById('file-upload').onchange = function(event) {
  
    let files = event.currentTarget.files;

    if(files.length !== 0){
        let allowedExtensions = ['jpg', 'jpeg', 'png', 'bmp', 'tiff', 'gif'];
        let maxSize = 5 * 1024 * 1024;
        let osszSize = 0;    
        let hirdetesazon = urlParams.get('hirdId');
        let tmp = urlParams.get('tmp');
        let userId = urlParams.get('temp');
        let miben;
        
        if (tmp == 1){
            miben = "Elado";
        }
        else{
            miben = "Kiado"; 
        }

        let formData = new FormData();
                
        let mappa="./kepek/" + miben + "/" + userId + "/" + hirdetesazon;

        formData.append('mappa', mappa);
        formData.append('miben', miben);
        formData.append('hirdetesazon', hirdetesazon);        
        console.log(files.length);
        for (let i = 0; i < files.length; i++) {
            let file = files[i];
            console.log(file);
           
            let extension = file.name.split('.').pop().toLowerCase();
            let fileSize = file.size;
            osszSize += fileSize;
            
            if (!allowedExtensions.includes(extension)) {
                alert('Hiba: Nem megfelelő fájlkiterjesztés. Elfogadott fájlok: ' + allowedExtensions.join(', '));
                document.getElementById('file-upload').value = '';
                return;
            }
        
            if (fileSize > maxSize) {
                alert('Hiba: Túl nagy fájlméret. Maximális méret: 5MB');
                document.getElementById('file-upload').value = '';
                return;
            }
            
            if (osszSize > maxSize){
                alert('Hiba: Túl nagy a fájlok mérete. Maximális méret: 5MB');
                document.getElementById('file-upload').value = '';
                return;
            }  
            formData.append('kepek', file);
        }
        console.log(formData.getAll('kepek'));
        kepAdd(formData, miben, hirdetesazon, userId);
        

    } 

}

async function kepAdd(formData, miben, hirdetesazon, userId) {

    try {
        let response = await fetch('http://localhost:3000/kepadd', {
        method: 'POST',
        body: formData
        }); 

        response = await response.json();

        if(response != -1){
            const newURL = updateURLParameter(window.location.href, 'pic', response);
            history.pushState(null, null, newURL);
            document.getElementById("kepEdit").innerHTML = "" ;
            renderKepek(miben, hirdetesazon, userId, response);
        }
        else{
            console.log("nem oké");
        }
    } catch (error) {
        console.error(error);
    } 
    
}