const express = require('express');
const router = express.Router();

const dbConn = require('../database');
const { isLoggedIn } = require('../lib/auth');

const fileUpload = require('express-fileupload');

// Repositorio
router.use(fileUpload());

//Pantalla repositorio de archivos
router.get('/uploadFile', isLoggedIn, async (req, res) => {
  const usuario = await dbConn.query('SELECT idUsuario FROM jpm.usuarios');
  res.render('repositorio/subir_archivo');
});

router.post('/uploadFile', function (req, res) {
  const d = new Date();

  const hour = d.getHours();
  const min = d.getMinutes();
  const sec = d.getSeconds();
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const date1 =
    d.getFullYear() + '/' + (month < 10 ? '0' : '') + month + '/' + (day < 10 ? '0' : '') + day + ' ' + (hour < 10 ? '0' : '') + hour + ':' + (min < 10 ? '0' : '') + min + ':' + (sec < 10 ? '0' : '') + sec;

  const file = req.files.file;
  if (file.length >= 2) {
    for (var i = 0; i < file.length; i++) {
      const url = 'src/repository/' + file[i].name;
      const name = file[i].name;
      const { description } = req.body;
      const newFile = {
        nombreArchivo: name,
        descripcionArchivo: description,
        fechaSubidaArchivo: date1,
        url: url
      };
      dbConn.query('INSERT INTO repositorio set ?', [newFile]);
    }
  } else {
    const name = file.name;
    const url = 'src/repository/' + file.name;
    const { description } = req.body;
    const newFile = {
      nombreArchivo: name,
      descripcionArchivo: description,
      fechaSubidaArchivo: date1,
      url: url
    };
    dbConn.query('INSERT INTO repositorio set ?', [newFile]);
  };

  // if (!req.files || Object.keys(req.files).length === 0) {
  //   return res.status(400).send('No files were uploaded.');
  // }

  // console.log(Array.isArray(file))
  // // Use the mv() method to place the file somewhere on your server 
  if (Array.isArray(file)) {

    for (var i = 0; i < file.length; i++) {
      file[i].mv('src/repository/' + file[i].name, function (err) {
        //if (err)  
        // return res.status(500).send(err);
      });
    }
    res.redirect('/repositorio');
  } else {
    file.mv('src/repository/' + file.name, function (err) {
    });
    console.log(file);
    res.redirect('/repositorio');
  }
});

//Listado repositorio de archivos
router.get('/', isLoggedIn, async (req, res, next) => {
  const archivos = await dbConn.query('SELECT * FROM jpm.repositorio');
  res.render('repositorio/listado_archivo', { archivos });
  console.log(archivos)
});

//Update descripcion 
//Listado repositorio de archivos
router.post('/newRepositorio', async (req, res) => {
  console.log('newRepositorio');
  const { name, date, description } = req.body;
  const rep = {
    nombreArchivo: name,
    fechaSubidaArchivo: date,
    descripcionArchivo: description,
  };
  await dbConn.query('UPDATE repositorio set ? WHERE idRepositorio = ?', [rep, idRepositorio]);
  res.redirect('repositorio/listado_archivo');
});

router.get('/deleteFile/:idRepositorio', async (req, res) => {
  const { idRepositorio } = req.params;
  await dbConn.query('DELETE FROM repositorio WHERE idRepositorio =?', [idRepositorio]);
  req.flash('success', 'Archivo eliminado');
  res.redirect('/repositorio');
});




module.exports = router;