window.onload = function generateId(){

  document.getElementById("hirdetesId").value = new Date().getTime() + Math.floor(Math.random() * 100000);

}

document.getElementById("inputContainer").innerHTML = '<input type="numtextber" id="ar" name="ar" min="0" placeholder="millió Ft" max="9999.9999" pattern="[1-9]{1,1}[0-9]{0,3}|[1-9]{1,1}[0-9]{0,3}[.]{1,1}[0-9]{0,4}" title="Min: 0, Max: 9999.9999" autocomplete="off" required></input>';

document.getElementById('elki').onchange = function() { 

  if (document.getElementById('elki').value === "Elado") {
    document.getElementById("inputContainer").innerHTML = '<input type="text" id="ar" name="ar" min="0" placeholder="millió Ft" max="9999.9999" pattern="[1-9]{1,1}[0-9]{0,3}|[1-9]{1,1}[0-9]{0,3}[.]{0,1}[0-9]{0,4}" title="Min: 0, Max: 9999.9999" autocomplete="off" required></input>';
  } 
  else {
    document.getElementById("inputContainer").innerHTML = '<input type="text" id="ar" name="ar" min="0" placeholder="ezer Ft" max="9999.9999" pattern="[1-9]{1,1}[0-9]{0,3}|[1-9]{1,1}[0-9]{0,3}[.]{0,1}[0-9]{0,4}" title="Min: 0, Max: 9999.9999" autocomplete="off" required></input>';
  }

}

document.getElementById('file-upload').onchange = function(event) {

  let files = event.currentTarget.files;
  let allowedExtensions = ['jpg', 'jpeg', 'png', 'bmp', 'tiff', 'gif'];
  let maxSize = 5 * 1024 * 1024;
  let osszSize = 0;
  let kepNev = 100;

  for (let i = 0; i < files.length; i++) {
    let file = files[i];
    let extension = file.name.split('.').pop().toLowerCase();
    let fileSize = file.size;
    osszSize += fileSize;   
    
    if (!allowedExtensions.includes(extension)) {
      alert('Hiba: Nem megfelelő fájlkiterjesztés. Elfogadott fájlok: ' + allowedExtensions.join(', '));
      document.getElementById('file-upload').value = '';
      return;
    }
    else if (fileSize > maxSize) {
      alert('Hiba: Túl nagy fájlméret. Maximális méret: 5MB');
      document.getElementById('file-upload').value = '';
      return; 
    }    
    else if (osszSize > maxSize){
      alert('Hiba: Túl nagy a fájlok mérete. Maximális méret: 5MB');
      document.getElementById('file-upload').value = '';
      return;
    }

    else{
      const renamedFile = new File([file], kepNev + "." + extension);
      files[i] = renamedFile;
      kepNev++;
    }
  }
  
}


document.getElementById('felad-form').onsubmit = async function (event){
        
  let files = document.getElementById('file-upload').files;
  
  if(files.length !== 0){
    let formData = new FormData();      

    let miben = document.getElementById('elki').value;
    let hirdetesId = document.getElementById('hirdetesId').value;    
    
    let mappa="./kepek/" + miben + "/" + userId + "/" + hirdetesId;

    formData.append('mappa', mappa);

    for (let i = 0; i < files.length; i++) {
      formData.append('kepek', files[i]);
    } 

    try {
          let result = await fetch('http://localhost:3000/kepfel', {
            method: 'POST',
            body: formData
          });
        
          if (result.ok) {
            console.log("Sikeres kérés");
          } 
          else {
            console.log("Hiba történt a kérésben");
          }
        } 
        catch (error) {
          console.error(error);
        }

  }  
  else return;
  
}