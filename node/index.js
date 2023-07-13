/**********		Middleware		**********/

const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;
const cors = require('cors');
const fs = require('fs-extra');
const path = require('path');
const multer = require('multer');

app.use(cors());
app.use(express.static('public'));

/**********		./		**********/
app.get('/', (req, res) => {
  
  const connection = mysql.createConnection({
    host: 'db',
    user: 'user',
    password: 'password',
    database: 'teszt'
  });

  connection.connect();
  
  connection.query('(SELECT *, "Elado" AS tmp FROM Elado ORDER BY id DESC LIMIT 5) UNION ALL (SELECT *, "Kiado" AS tmp FROM Kiado ORDER BY id DESC LIMIT 5)', function (error, results, fields) {
    if(error) throw error;
    res.json(results);
  });

  connection.end();
});

/**********		Eladó ingatlanok		**********/
app.get('/frisseladoak', (req, res) => {
  
  const connection = mysql.createConnection({
    host: 'db',
    user: 'user',
    password: 'password',
    database: 'teszt'
  });

  connection.connect();
  
  connection.query('(SELECT * FROM Elado LIMIT 13)', function (error, results, fields) {
    if(error) throw error;
    res.json(results);
  });
  connection.end();
});

app.post('/frisseladoak', express.json(),  (req, res) => {

  let utolso = req.body.utolso;
  utolso *= 12;  
  
  let sql = "SELECT * FROM Elado LIMIT 13 OFFSET " + utolso;
  
  const connection = mysql.createConnection({
    host: 'db',
    user: 'user',
    password: 'password',
    database: 'teszt'
  });
  connection.connect();
  
  connection.query(sql, function (error, results, fields) {
    if(error) throw error;
    res.json(results);
  });
  connection.end();
});

app.post('/elado', express.json(),  (req, res) => {

  let tipus = req.body.tipus;
  let telepules = req.body.telepules;
  let min = Number(req.body.min);
  let max = Number(req.body.max);
  let utolso = req.body.utolso;
  utolso *= 12;
  
  if(tipus != "" || telepules != "" || min != 0 || max != 0){
    let sql = "SELECT * FROM Elado WHERE";

    if(tipus!=""){
      sql += " tipus='" + tipus + "'";
    }
    if(telepules!=""){
      if(tipus!=""){
        sql += " AND varos='" + telepules + "'";
      }    
      else{
        sql += " varos='" + telepules + "'";
      }
    }

    if(min != 0 || max != 0){
      if(min<max){
        if(telepules != "" || tipus != ""){
          sql += "AND ar >= '" + min + "' AND ar <= '" + max + "'";
        }
        else{
          sql += " ar >= '" + min + "' AND ar <= '" + max + "'";
        }      
      }
      else if(min>max && max === 0){
        if(telepules != "" || tipus != ""){
          sql += "AND ar >= '" + min + "'";
        }
        else{
          sql += " ar >= '" + min + "'";
        } 
      }
      else if(min>max && max != 0){
        if(telepules != "" || tipus != ""){
          sql += "AND ar >= '" + max + "' AND ar <= '" + min + "'";
        }
        else{
          sql += " ar >= '" + max + "' AND ar <= '" + min + "'";
        }
      }
      else{
        sql += "";
      }
    }
    
    
    const connection = mysql.createConnection({
      host: 'db',
      user: 'user',
      password: 'password',
      database: 'teszt'
    });
    connection.connect();
    sql +=" LIMIT 13 OFFSET " + utolso;

    connection.query(sql, function (error, results, fields) {
      if(error) throw error;
      res.json(results);
    });
    connection.end();
  }
  else{
    res.json("");
  }
});

/**********		Kiadó ingatlanok		**********/
app.get('/frisskiadoak', (req, res) => {

  const connection = mysql.createConnection({
    host: 'db',
    user: 'user',
    password: 'password',
    database: 'teszt'
  });

  connection.connect();
  
  connection.query('(SELECT * FROM Kiado LIMIT 13)', function (error, results, fields) {
    if(error) throw error;
    res.json(results);
  });
  connection.end();

});

app.post('/frisskiadoak', express.json(),  (req, res) => {

  let utolso = req.body.utolso;
  utolso *= 12;  
  
  let sql = "SELECT * FROM Kiado LIMIT 13 OFFSET " + utolso;
  
  const connection = mysql.createConnection({
    host: 'db',
    user: 'user',
    password: 'password',
    database: 'teszt'
  });
  connection.connect();
  
  connection.query(sql, function (error, results, fields) {
    if(error) throw error;
    res.json(results);
  });
  connection.end();

});

app.post('/kiado', express.json(),  (req, res) => {

  let tipus = req.body.tipus;
  let telepules = req.body.telepules;
  let min = Number(req.body.min);
  let max = Number(req.body.max);
  let utolso = req.body.utolso;
  utolso *= 12;
  
  if(tipus != "" || telepules != "" || min != 0 || max != 0){
    let sql = "SELECT * FROM Kiado WHERE";

    if(tipus!=""){
      sql += " tipus='" + tipus + "'";
    }
    if(telepules!=""){
      if(tipus!=""){
        sql += " AND varos='" + telepules + "'";
      }    
      else{
        sql += " varos='" + telepules + "'";
      }
    }

    if(min != 0 || max != 0){
      if(min<max){
        if(telepules != "" || tipus != ""){
          sql += "AND ar >= '" + min + "' AND ar <= '" + max + "'";
        }
        else{
          sql += " ar >= '" + min + "' AND ar <= '" + max + "'";
        }      
      }
      else if(min>max && max === 0){
        if(telepules != "" || tipus != ""){
          sql += "AND ar >= '" + min + "'";
        }
        else{
          sql += " ar >= '" + min + "'";
        } 
      }
      else if(min>max && max != 0){
        if(telepules != "" || tipus != ""){
          sql += "AND ar >= '" + max + "' AND ar <= '" + min + "'";
        }
        else{
          sql += " ar >= '" + max + "' AND ar <= '" + min + "'";
        }
      }
      else{
        sql += "";
      }
    }

    const connection = mysql.createConnection({
      host: 'db',
      user: 'user',
      password: 'password',
      database: 'teszt'
    });
    connection.connect();

    sql += " LIMIT 13 OFFSET " + utolso;
    
    connection.query(sql, function (error, results, fields) {
      if(error) throw error;
      res.json(results);
    });
    connection.end();
  }
  else{
    res.json("");
  }
});

/**********		Hirdetés megjelenítése		**********/
app.post('/hirdetes', express.json(),  (req, res) => {

  let hirdetesazon = req.body.hirdetesazon;
  let miben = req.body.miben; 
  
  let sql =  'SELECT * FROM ' + miben + ' WHERE hirdetesazon=' + hirdetesazon;

  const connection = mysql.createConnection({
    host: 'db',
    user: 'user',
    password: 'password',
    database: 'teszt'
  });
  connection.connect();
  
  connection.query(sql, function (error, results, fields) {
    if(error) throw error;
    res.json(results);
  });
  connection.end();  

});

/**********		Saját hirdetések kezelése		**********/
app.post('/hirdeteseim', express.json(),  (req, res) => {

  let id = req.body.id;  
  
  let sql =  'SELECT *, "Elado" AS tmp FROM Elado WHERE userid = ' + id + ' UNION ALL SELECT *, "Kiado" AS tmp FROM Kiado WHERE userid = ' + id + ' ORDER BY id DESC';

  const connection = mysql.createConnection({
    host: 'db',
    user: 'user',
    password: 'password',
    database: 'teszt'
  });
  connection.connect();
  
  connection.query(sql, function (error, results, fields) {
    if(error) throw error;
    res.json(results);
  });
  connection.end();

});

app.post('/torol', express.json(),  (req, res) => {

  let miben = req.body.miben;
  let hirdetesazon = req.body.hirdetesazon;
  let userId = req.body.userId;
  let kepek = req.body.kepek;
  
  if(miben !== "Elado" && miben !== "Kiado"){
    res.json(0);
  }
  else if(typeof(hirdetesazon) !== "number"){
    res.json(0);
  }
  else{
    let sql =  'DELETE FROM ' + miben + ' WHERE hirdetesazon = ' + hirdetesazon;
    
    if(kepek > 0){
      let mappa="./kepek/" + miben + "/" + userId + "/" + hirdetesazon;
      deleteFolderRecursive(mappa);
    }        

    const connection = mysql.createConnection({
      host: 'db',
      user: 'user',
      password: 'password',
      database: 'teszt'
    });
    connection.connect();
    
    connection.query(sql, function (error, results, fields) {
      if(error) throw error;
      
      res.json(1);
      
    });
    connection.end();
  } 

});

  /**********		Képek kezelése		**********/
app.post('/keptorol', express.json(),  async (req, res) => {
  
  let miben = req.body.miben;
  let userId = req.body.userId;
  let hirdetesazon = req.body.hirdetesazon;
  let kepSzam = req.body.kepSzam;

  let mappa="./kepek/" + miben + "/" + userId + "/" + hirdetesazon;    
  let file="./kepek/" + miben + "/" + userId + "/" + hirdetesazon + "/" + kepSzam + ".jpg";

  try {
    fs.unlinkSync(file);

    let kepek = fs.readdirSync(mappa);
    
    const kepekSzama = kepek.length;
    console.log(kepekSzama);
    let kepNev = 100;

    for(let i=0; i<kepekSzama; i++){  
      const file = kepek[i];   
      let oldFilePath = mappa + "/" + file;    
      let newFileName = kepNev + '.jpg';
      let newImagePath = mappa + "/" + newFileName;
            
      fs.renameSync(oldFilePath, newImagePath);
      kepNev++;        
    }

    let sql =  'UPDATE ' + miben + ' SET kepek=' + (kepekSzama) + ' WHERE hirdetesazon=' + hirdetesazon;
      
    const connection = mysql.createConnection({
      host: 'db',
      user: 'user',
      password: 'password',
      database: 'teszt'
    });
    connection.connect();
        
    connection.query(sql, function (error, results, fields) {
      if (error) throw error;
      res.json(kepekSzama);
    });
    connection.end();      
  }
  catch (error) {
    console.log(error);
    res.json(-1);
  }

});

const deleteFolderRecursive = async function(folderPath){

  try{
    await fs.remove(folderPath);
    console.log('A mappa sikeresen törölve lett.');
  }
  catch (err) {
    console.error('Hiba történt a mappa törlése közben:', err);
  } 

};

const upload = multer({ dest: "uploads/" });
const Jimp = require('jimp');
app.post('/kepfel', upload.array('kepek'), async (req, res) => {

  const mappa = req.body.mappa;
  const kepek = req.files; 

  try {
    if (!fs.existsSync(mappa)){
      fs.mkdirSync(mappa, { recursive: true });
      console.log("mappa létrehozva");
    }
  }
  catch (err){
    console.error(err);
  }

  const MAX_WIDTH = 1920;
  const MAX_HEIGHT = 1080;
  let kepNev = 100;
  for (let i = 0; i < kepek.length; i++) {
    
    const file = kepek[i]; 
    const imagePath = file.path;

    try {
      const image = await Jimp.read(imagePath);
      const kiterjesztes = file.originalname.split('.').pop().toLowerCase();
      const newFileName = `${kepNev}.jpg`;
      const newImagePath = `${mappa}/${newFileName}`;    
      if(kiterjesztes != "jpg"){ 
            
          image.write(newImagePath, (err) => {
            if (err) {
              console.error('Hiba a kép konvertálásakor:', err);
              return;
            }

            if (image.bitmap.width > MAX_WIDTH || image.bitmap.height > MAX_HEIGHT) {
              Jimp.read(newImagePath, (err, convertedImage) => {
                if (err) {
                  console.error('Hiba a kép betöltésekor:', err);
                  return;
                }
                
                let curWidth = image.bitmap.width;
                let curHeight = image.bitmap.height;
                let newWidth = 0
                let newHeight = 0;
                                
                if(curWidth > MAX_WIDTH){
                  newWidth = MAX_WIDTH;
                  let ratio = MAX_WIDTH / curWidth;
                  newHeight = curHeight * ratio;
                  
                  if(newHeight>MAX_HEIGHT){
                    ratio = MAX_HEIGHT / newHeight;
                    newHeight = MAX_HEIGHT;
                    newWidth *= ratio;
                  }
                  
                }
                else{
                  newHeight = MAX_HEIGHT;
                  ratio = MAX_HEIGHT / curHeight;
                  newWidth = curWidth * ratio;
                  
                }
                
                image.resize(newWidth, newHeight).quality(90).write(newImagePath);
              });
            } 
          });
        
      }
      else{        

        let curWidth = image.bitmap.width;
        let curHeight = image.bitmap.height;
        let newWidth = 0
        let newHeight = 0;
        
        
        if (curWidth > MAX_WIDTH || curHeight > MAX_HEIGHT) {        
              
          if(curWidth > MAX_WIDTH){
            newWidth = MAX_WIDTH;
            let ratio = MAX_WIDTH / curWidth;
            newHeight = curHeight * ratio;
            
            if(newHeight>MAX_HEIGHT){
              ratio = MAX_HEIGHT / newHeight;
              newHeight = MAX_HEIGHT;
              newWidth *= ratio;
            }
            
          }
          else{
            newHeight = MAX_HEIGHT;
            ratio = MAX_HEIGHT / curHeight;
            newWidth = curWidth * ratio;
            
          }
          
          image.resize(newWidth, newHeight).quality(90).write(newImagePath);
            
        }   
        else{
          fs.renameSync(file.path, newImagePath);
        }
      }
      
    } catch (err) {
      console.error('Hiba a kép betöltésekor:', err);
    }

  kepNev++;
  }
});

app.post('/kepadd', upload.array('kepek'), async (req, res) => {

  const mappa = req.body.mappa;
  const miben = req.body.miben;
  const hirdetesazon = req.body.hirdetesazon;
  const kepek = req.files; 
  
  
  try {
    if (!fs.existsSync(mappa)) {
      fs.mkdirSync(mappa, { recursive: true });
      console.log("mappa létrehozva");
    }
  } 
  catch(err){
    console.error(err);
  }

  let kepNev=99;  
  let picNum = 0;
  fs.readdirSync(mappa).forEach(file => {
    kepNev++;
    picNum++;
  });

  const MAX_WIDTH = 1920;
  const MAX_HEIGHT = 1080;
  for(let i = 0; i < kepek.length; i++){
    kepNev++;
    picNum++;
    const file = kepek[i]; 
    const imagePath = file.path;

    try {
      const image = await Jimp.read(imagePath);
      const kiterjesztes = file.originalname.split('.').pop().toLowerCase();
      const newFileName = `${kepNev}.jpg`;
      const newImagePath = `${mappa}/${newFileName}`;    
      if(kiterjesztes != "jpg"){ 
            
          image.write(newImagePath, (err) => {
            if (err) {
              console.error('Hiba a kép konvertálásakor:', err);
              return;
            }

            if (image.bitmap.width > MAX_WIDTH || image.bitmap.height > MAX_HEIGHT) {
              Jimp.read(newImagePath, (err, convertedImage) => {
                if (err) {
                  console.error('Hiba a kép betöltésekor:', err);
                  return;
                }
                
                let curWidth = image.bitmap.width;
                let curHeight = image.bitmap.height;
                let newWidth = 0
                let newHeight = 0;
                                
                if(curWidth > MAX_WIDTH){
                  newWidth = MAX_WIDTH;
                  let ratio = MAX_WIDTH / curWidth;
                  newHeight = curHeight * ratio;
                  
                  if(newHeight>MAX_HEIGHT){
                    ratio = MAX_HEIGHT / newHeight;
                    newHeight = MAX_HEIGHT;
                    newWidth *= ratio;
                  }
                  
                }
                else{
                  newHeight = MAX_HEIGHT;
                  ratio = MAX_HEIGHT / curHeight;
                  newWidth = curWidth * ratio;
                  
                }
                
                image.resize(newWidth, newHeight).quality(90).write(newImagePath);
              });
            } 
          });
        
      }
      else{        

        let curWidth = image.bitmap.width;
        let curHeight = image.bitmap.height;
        let newWidth = 0
        let newHeight = 0;
        
        
        if (curWidth > MAX_WIDTH || curHeight > MAX_HEIGHT) {        
              
          if(curWidth > MAX_WIDTH){
            newWidth = MAX_WIDTH;
            let ratio = MAX_WIDTH / curWidth;
            newHeight = curHeight * ratio;
            
            if(newHeight>MAX_HEIGHT){
              ratio = MAX_HEIGHT / newHeight;
              newHeight = MAX_HEIGHT;
              newWidth *= ratio;
            }
            
          }
          else{
            newHeight = MAX_HEIGHT;
            ratio = MAX_HEIGHT / curHeight;
            newWidth = curWidth * ratio;
            
          }
          
          image.resize(newWidth, newHeight).quality(90).write(newImagePath);
            
        }   
        else{
          fs.renameSync(file.path, newImagePath);
        }
      }
      
    } catch (err) {
      console.error('Hiba a kép betöltésekor:', err);
    }    
            
  }

  let sql =  'UPDATE ' + miben + ' SET kepek=' + (picNum) + ' WHERE hirdetesazon=' + hirdetesazon;
      
      const connection = mysql.createConnection({
        host: 'db',
        user: 'user',
        password: 'password',
        database: 'teszt'
      });
      connection.connect();
        
      connection.query(sql, function (error, results, fields) {
        if (error) throw error;
        res.json(picNum);
      });
      connection.end();
  
});

app.post('/kepelso', express.json(),  (req, res) => {
  
  let miben = req.body.miben;
  let userId = req.body.userId;
  let hirdetesazon = req.body.hirdetesazon;
  let kepSzam = req.body.kepSzam;

  let mappa="./kepek/" + miben + "/" + userId + "/" + hirdetesazon;
  let tmpMappa = "./kepek/" + miben + "/" + userId + "/" + hirdetesazon + "/tmp";
  if (!fs.existsSync(tmpMappa)) {
    fs.mkdirSync(tmpMappa, { recursive: true });
  }    
  let fileName=kepSzam + ".jpg";

  try {
    let kepek = fs.readdirSync(mappa);    
    let kepekSzama = kepek.length-1;
    let kepNev = 101;
    for(let i=0; i<kepekSzama; i++){  
      const file = kepek[i];      
      console.log(file);
      if(file === fileName){
        let oldFilePath = mappa + "/" + file;    
        let newFileName = '100.jpg';
        let newImagePath = tmpMappa + "/" + newFileName;
        fs.renameSync(oldFilePath, newImagePath);        
      }
      else{
        let oldFilePath = mappa + "/" + file;    
        let newFileName = kepNev + '.jpg';
        let newImagePath = tmpMappa + "/" + newFileName;
        fs.renameSync(oldFilePath, newImagePath);
        kepNev++;
      }             
    }    
  }
  catch (error) {
    console.log(error);
    res.json(-1);
  }
  console.log("lefutottam");
  try {
    let kepek = fs.readdirSync(tmpMappa);    
    
    for(let i=0; i<kepek.length; i++){  
      const file = kepek[i];      
      
      fs.copyFile(tmpMappa + "/" + file, mappa + "/" + file, (err) => {
        if (err) throw err;
      });              
    }    
  }
  catch (error) {
    console.log(error);
    res.json(-1);
  }
  res.json(1);
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});