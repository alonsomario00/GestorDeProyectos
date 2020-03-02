const express = require('express');
const router = express.Router();

const dbConn = require('../database');
const { isLoggedIn } = require('../lib/auth');


router.get('/', function(req, res, next) {
  res.render('fichado/fichado');
});


//FICHADO
router.get('/fichajeEntrada', isLoggedIn, async (req, res) =>{
    const ficha = dbConn.query("INSERT INTO fichajes (fecha, hora, idUsuario, entrada) VALUES (CURRENT_DATE(),CURRENT_TIME(),?, '1')",  [req.user.idUsuario]); 
    const hora = await dbConn.query("SELECT * FROM jpm.fichajes WHERE entrada = 1 AND fecha = CURRENT_DATE() ORDER BY idFichaje DESC LIMIT 1 ");

    res.render('fichado/fichado');
  });
  
  router.get('/fichajeSalida', isLoggedIn, async (req, res) =>{
    const ficha = dbConn.query("INSERT INTO fichajes (fecha, hora, idUsuario, entrada) VALUES (CURRENT_DATE(),CURRENT_TIME(),?, '0')",  [req.user.idUsuario]);
    const hora = await dbConn.query("SELECT * FROM jpm.fichajes WHERE entrada = 0 AND fecha = CURRENT_DATE() ORDER BY idFichaje DESC LIMIT 1");

    res.render('fichado/fichado');
  });

  module.exports = router;