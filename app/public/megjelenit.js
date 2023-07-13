window.onload = function() {

    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    let hirdetesazon = urlParams.get('hirdId');
    let tmp = urlParams.get('tmp');
    let userId = urlParams.get('temp');
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
    conn(hirdetesazon, miben, tipus);
    
}
    
async function conn(hirdetesazon, miben, tipus){
        
    const body = {
        "hirdetesazon": hirdetesazon,
        "miben": miben,
        };    
    let response = await fetch('http://localhost:3000/hirdetes', {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(body)
    });
        
    response = await response.json();
    let estate = response[0];    

    renderEstate(estate, miben, tipus);    
    
}     

function renderEstate(estate, miben, tipus){

    let estateHTML = "";
    let kepekHTML="";
    let ar;
   
    if(estate.kepek > 2){
        kepekHTML += `
            <div class="kepMain" onclick="gallery(${estate.kepek}, '${miben}', ${estate.userid}, ${estate.hirdetesazon}, 0)" style="background-image: url('http://localhost:3000/kepek/${miben}/${estate.userid}/${estate.hirdetesazon}/100.jpg');"></div>
            <div class="kepSide">
                <div class="kep" onclick="gallery(${estate.kepek}, '${miben}', ${estate.userid}, ${estate.hirdetesazon}, 1)" style="background-image: url('http://localhost:3000/kepek/${miben}/${estate.userid}/${estate.hirdetesazon}/101.jpg');"></div>
                <div class="kep" onclick="gallery(${estate.kepek}, '${miben}', ${estate.userid}, ${estate.hirdetesazon}, 2)" style="background-image: url('http://localhost:3000/kepek/${miben}/${estate.userid}/${estate.hirdetesazon}/102.jpg');"></div>
            </div>        
        `;
    }
    else if(estate.kepek == 2){
        kepekHTML += `
            <div class="kepMain" onclick="gallery(${estate.kepek}, '${miben}', ${estate.userid}, ${estate.hirdetesazon}, 0)" style="background-image: url('http://localhost:3000/kepek/${miben}/${estate.userid}/${estate.hirdetesazon}/100.jpg');"></div>
            <div class="kepSide">
                <div class="kep" onclick="gallery(${estate.kepek}, '${miben}', ${estate.userid}, ${estate.hirdetesazon}, 1)" style="background-image: url('http://localhost:3000/kepek/${miben}/${estate.userid}/${estate.hirdetesazon}/101.jpg');"></div>
                <div class="noKep" onclick="gallery(${estate.kepek}, '${miben}', ${estate.userid}, ${estate.hirdetesazon}, 0)" style="background-image: url('/images/OIG.jpg');"></div>
            </div>        
        `;
    }
    else if(estate.kepek == 1){
        kepekHTML += `
            <div class="kepMain" onclick="gallery(${estate.kepek}, '${miben}', ${estate.userid}, ${estate.hirdetesazon}, 0)" style="background-image: url('http://localhost:3000/kepek/${miben}/${estate.userid}/${estate.hirdetesazon}/100.jpg');"></div>
            <div class="kepSide">
                <div class="noKep" onclick="gallery(${estate.kepek}, '${miben}', ${estate.userid}, ${estate.hirdetesazon}, 0)" style="background-image: url('/images/OIG.jpg');"></div>
                <div class="noKep" onclick="gallery(${estate.kepek}, '${miben}', ${estate.userid}, ${estate.hirdetesazon}, 0)" style="background-image: url('/images/OIG.jpg');"></div>
            </div>        
        `;
    }           
    else{
        kepekHTML += `
            <div class="noKepMain" style="background-image: url('/images/OIG.jpg');"></div>
            <div class="kepSide">
                <div class="noKep" style="background-image: url('/images/OIG.jpg');"></div>
                <div class="noKep" style="background-image: url('/images/OIG.jpg');"></div>
            </div>        
        `;
    }
            
    if(miben === "Elado"){
        ar = estate.ar * 1000000;
    }
    else{
        ar = estate.ar * 1000;
    }
    estateHTML += `        
        <div id="estateAdat">
            <div id="estateCim"><h2>${tipus} ${estate.tipus}</h2></div>   
            <div id="estateHol"><h2>${estate.varos}, ${estate.utcanev} ${estate.kozterulet} ${estate.hazszam}.</h2></div>
            <div id="estateAdatok">
                <div id="estateAr"><h3>Ár</h3><br><p>${ar.toLocaleString("de-DE")} Ft</p></div>            
                <div id="estateAlapterulet"><h3>Alapterület</h3><br><p>${estate.alapterulet} m&sup2</p></div>
                <div id="estateSzobaszam"><h3>Szobaszám</h3><br><p>${estate.szobaszam} szoba</p></div>
                <div id="estateKapcsTel"><h3>Telefon</h3><br><p>${estate.kapcstel}</p></div>
                <div id="estateKapcsEmail"><h3>Email</h3><br><p>${estate.kapcsemail}</p></div>
            </div>
            <div id="estateLeiras"><h2>Leírás</h2><br><p>${estate.leiras}</p></div> 
        </div>          
    `;

    document.getElementById("kepek").innerHTML = kepekHTML;
    document.getElementById("estate").innerHTML = estateHTML;

}

function gallery(kepek, miben, userid, hirdetesazon, kepKatt){

    let imageUrls = [];
    let kepNev = 100;

    for(let i=0; i<kepek; i++){
        let url="http://localhost:3000/kepek/" + miben +  "/" + userid + "/" + hirdetesazon + "/" + kepNev + ".jpg";
        imageUrls.push(url);
        kepNev++;
    }
    
    let galleryHTML = `
        <div class="gallery-overlay">
            <div class="gallery-modal">
                <span class="gallery-close">x</span>
                <div class="slider">
    `;

    for (let i = 0; i < kepek; i++) {
        let imageUrl = imageUrls[i];
        galleryHTML += `
                <div>
                    <img src="${imageUrl}" alt="Kép ${i + 1}">
                </div>
        `;
    }

    galleryHTML += `
            </div>
                <div class="gallery-prev"><p><</p></div>
                <div class="gallery-next"><p>></p></div>
            </div>
        </div>
    `;

    let modalContainer = document.createElement('div');
    modalContainer.innerHTML = galleryHTML;
    document.body.appendChild(modalContainer);

    let currentImageIndex = 0;
    let images = document.querySelectorAll('.slider img');
    let prevBtn = document.querySelector('.gallery-prev');
    let nextBtn = document.querySelector('.gallery-next');
    let closeBtn = document.querySelector('.gallery-close');
    let overlay = document.querySelector('.gallery-overlay');

    function showImage(index) {
    
        for (let i = 0; i < images.length; i++) {
            images[i].style.display = 'none';
        }
    
        images[index].style.display = 'block';
        currentImageIndex = index;

    }

    function showNextImage() {
        if (currentImageIndex < kepek - 1) {
            showImage(currentImageIndex + 1);
        }
        else{
            showImage(0);
        }
    }

    function showPreviousImage() {
        if (currentImageIndex > 0) {
            showImage(currentImageIndex - 1);
        }
        else{
            showImage(images.length-1);
        }
    }
    function closeModal() {
    
        modalContainer.remove();
    }

    prevBtn.addEventListener('click', showPreviousImage);
    nextBtn.addEventListener('click', showNextImage);
    closeBtn.addEventListener('click', closeModal);
    
    overlay.addEventListener('click', function (event){
    
        if(event.target === overlay){
            closeModal();
        }
    });
  
    showImage(kepKatt);

}

async function getEmail(userId){
        
    const body = {
        "userid": userId
        };    
    let email = await fetch('http://localhost:3000/hirdetesmail', {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(body)
    });
        
    email = await email.json();  
    return(email[0].email);

} 


