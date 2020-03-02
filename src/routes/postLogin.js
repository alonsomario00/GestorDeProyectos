const express = require('express');
const router = express.Router();

const dbConn = require('../database');
const { isLoggedIn } = require('../lib/auth');


router.get('/', isLoggedIn, async (req, res) => {
    const proyectos = await dbConn.query('SELECT P.idProyecto, P.nombreProyecto, P.descripcionProyecto, U.nombreUsuario, P.fechaInicioProyecto, P.fechaFinProyecto FROM jpm.proyectos P, jpm.usuarios U, jpm.puesto M WHERE P.idBoss = U.idUsuario AND M.idPuesto = 2 LIMIT 3');
  
    const tareas = await dbConn.query('SELECT T.*, U.idUsuario, U.nombreUsuario FROM jpm.tareas T, jpm.usuarios U WHERE U.idUsuario = ? LIMIT 3', req.user.idUsuario);
    for (tarea of tareas) {
        const proyecto = await dbConn.query("SELECT nombreProyecto FROM jpm.proyectos WHERE idProyecto = ?", tarea.idProyecto);
        tarea.nombreProyecto = proyecto[0].nombreProyecto;
    }
    res.render('inicio', {proyectos, tareas});
  });




  module.exports = router;