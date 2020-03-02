const express = require('express');
const router = express.Router();

const dbConn = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/addWork', async (req, res) => {
    const senior = await dbConn.query("SELECT U.nombreUsuario, U.idPuesto, U.idUsuario, M.idPuesto FROM jpm.usuarios U, jpm.puesto M WHERE U.idPuesto = 3 AND U.idPuesto = M.idPuesto");
    for (var i = 0; i < senior.length; i++) {
        if (senior[i].idUsuario == req.user.idUsuario) {
            senior[i].selected = true;
        }
    };
    const junior = await dbConn.query("SELECT U.nombreUsuario, U.idPuesto, U.idUsuario, M.idPuesto FROM jpm.usuarios U, jpm.puesto M WHERE U.idPuesto = 4 AND U.idPuesto = M.idPuesto");
    for (var i = 0; i < junior.length; i++) {
        if (junior[i].idUsuario == req.user.idUsuario) {
            junior[i].selected = true;
        }
    };
    const proyecto = await dbConn.query("SELECT nombreProyecto, idProyecto FROM jpm.proyectos")

    res.render('tareas/alta_tareas', { senior: senior, junior: junior, proyecto: proyecto });
});

router.post('/addWork', async (req, res) => {
    const { name, description, date1, date2, proyect, senior, junior } = req.body;
    const newWork = {
        nombreTarea: name,
        descripcionTarea: description,
        fechaInicioTarea: date1,
        fechaFinTarea: date2,
        idProyecto: proyect,
        idSenior: senior,
        idJunior: junior
    };
    await dbConn.query('INSERT INTO tareas set ?', [newWork]);
    console.log(newWork)
    res.redirect('/tareas');
});

router.get('/', isLoggedIn, async (req, res, next) => {
    const tareas = await dbConn.query('SELECT DISTINCT T.idTarea ,T.nombreTarea, T.idProyecto, T.fechaInicioTarea, T.fechaFinTarea, T.idSenior, T.idJunior FROM jpm.tareas T INNER JOIN jpm.usuarios U ON U.idUsuario = T.idSenior OR U.idUsuario = T.idJunior WHERE T.idSenior = ? OR T.idJunior = ? OR T.idBoss = ?', [req.user.idUsuario, req.user.idUsuario, req.user.idUsuario]);
    // console.log(tareas.length);
    for (tarea of tareas) {
        const senior = await dbConn.query("SELECT nombreUsuario FROM jpm.usuarios WHERE idUsuario = ?", tarea.idSenior);
        const junior = await dbConn.query("SELECT nombreUsuario FROM jpm.usuarios WHERE idUsuario = ?", tarea.idJunior);
        const proyecto = await dbConn.query("SELECT nombreProyecto FROM jpm.proyectos WHERE idProyecto = ?", tarea.idProyecto);
        tarea.nombreSenior = senior[0].nombreUsuario;
        tarea.nombreJunior = junior[0].nombreUsuario;
        tarea.nombreProyecto = proyecto[0].nombreProyecto;
    }
    res.render('tareas/lista_tareas', { tareas });
});

router.get('/deleteWork/:idTarea', async (req, res) => {
    const { idTarea } = req.params;
    await dbConn.query('DELETE FROM tareas WHERE idTarea = ?', [idTarea]);
    req.flash('success', 'Tarea eliminada');
    res.redirect('/tareas');
});

router.get('/editWork/:idTarea', async (req, res) => {
    const { idTarea } = req.params;
    const tareas = await dbConn.query("SELECT * FROM jpm.tareas WHERE idTarea = ?", [idTarea]);
    const proyect = await dbConn.query("SELECT idProyecto, nombreProyecto AS proyect FROM jpm.proyectos");
    for (var i = 0; i < proyect.length; i++) {
        if (proyect[i].idProyecto == tareas[0].idProyecto) {
            proyect[i].selected = true;
        }
    };

    const senior = await dbConn.query("SELECT DISTINCT U.idUsuario, U.nombreUsuario AS senior FROM jpm.tareas T INNER JOIN usuarios U ON T.idSenior=U.idUsuario");
    for (var i = 0; i < senior.length; i++) {
        if (senior[i].idUsuario == tareas[0].idSenior) {
            senior[i].selected = true;
        }
    };

    const junior = await dbConn.query("SELECT DISTINCT U.idUsuario, U.nombreUsuario AS junior FROM jpm.tareas T INNER JOIN usuarios U ON T.idJunior=U.idUsuario");
    for (var i = 0; i < junior.length; i++) {
        if (junior[i].idUsuario == tareas[0].idJunior) {
            junior[i].selected = true;
        }
    };

    const nombreProyecto = await dbConn.query("SELECT P.nombreProyecto FROM jpm.proyectos P INNER JOIN jpm.tareas T ON P.idProyecto = T.idProyecto");
    for (var i = 0; i < nombreProyecto.length; i++) {
        if (nombreProyecto[i].idUsuario == tareas[0].idProyecto) {
            nombreProyecto[i].selected = true;
        }
    };

    res.render('tareas/editar_tarea', { tareas: tareas[0], programadorSenior: senior, programadorJunior: junior, nombreProyecto: proyect });
});

router.post('/editWork/:idTarea', async (req, res) => {
    const { idTarea } = req.params;
    const { name, description, date1, date2, proyect, senior, junior } = req.body;
    const newWork = {
        nombreTarea: name,
        descripcionTarea: description,
        fechaInicioTarea: date1,
        fechaFinTarea: date2,
        idProyecto: proyect,
        idSenior: senior,
        idJunior: junior
    };

    await dbConn.query('UPDATE tareas set ? WHERE idTarea = ?', [newWork, idTarea]);
    req.flash('success', 'Proyecto actualizado');
    res.redirect('/tareas');
});

module.exports = router;