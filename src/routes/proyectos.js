const express = require('express');
const router = express.Router();

const dbConn = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/addProyect', async (req, res) => {
    const nombreUsuario = await dbConn.query('SELECT U.nombreUsuario, U.idUsuario FROM jpm.usuarios U, jpm.puesto M WHERE U.idPuesto = 2 AND U.idPuesto = M.idPuesto');
    for (var i = 0; i < nombreUsuario.length; i++) {
        if (nombreUsuario[i].idUsuario == req.user.idUsuario) {
            nombreUsuario[i].selected = true;
        }
    };
    res.render('proyectos/alta_proyecto', { usuarios: nombreUsuario });
});

router.post('/addProyect', async (req, res) => {
    const { name, description, date1, date2, boss } = req.body;
    const newProyect = {
        nombreProyecto: name,
        descripcionProyecto: description,
        fechaInicioProyecto: date1,
        fechaFinProyecto: date2,
        idBoss: boss
    };
    await dbConn.query('INSERT INTO proyectos set ?', [newProyect]);
    res.render('inicio');
});

router.get('/', isLoggedIn, async (req, res, next) => {
    const proyectos = await dbConn.query('SELECT P.idProyecto, P.nombreProyecto, P.descripcionProyecto, P.fechaInicioProyecto, P.fechaFinProyecto, P.idBoss, U.nombreUsuario FROM jpm.proyectos P  INNER JOIN jpm.tareas T ON P.idProyecto = T.idProyecto INNER JOIN usuarios U on U.idUsuario = P.idBoss WHERE P.idBoss = ? OR T.idSenior = ? OR T.idJunior = ?', [req.user.idUsuario, req.user.idUsuario, req.user.idUsuario]);
    // const boss = await dbConn.query('SELECT U.nombreUsuario FROM jpm.usuarios U INNER JOIN jpm.proyectos P WHERE U.idusuario = ?', proyectos.idBoss)
    res.render('proyectos/lista_proyectos', { proyectos });
});

router.get('/deleteProyect/:idProyecto', async (req, res) => {
    const { idProyecto } = req.params;
    await dbConn.query('DELETE FROM proyectos WHERE idProyecto =?', [idProyecto]);
    req.flash('success', 'Proyecto eliminado');
    res.redirect('/proyectos');
});

router.get('/editProyect/:idProyecto', async (req, res) => {
    const { idProyecto } = req.params;
    const tareas = await dbConn.query('SELECT T.idTarea, T.idProyecto, T.nombreTarea, T.fechaInicioTarea, T.fechaFinTarea, T.idSenior, T.idJunior FROM jpm.tareas T INNER JOIN jpm.proyectos P ON T.idProyecto = P.idProyecto WHERE P.idProyecto = ?', [idProyecto]);
    for ( tarea of tareas) {
        const senior = await dbConn.query("SELECT nombreUsuario FROM jpm.usuarios WHERE idUsuario = ?", tarea.idSenior);
        const junior = await dbConn.query("SELECT nombreUsuario FROM jpm.usuarios WHERE idUsuario = ?", tarea.idJunior);
        tarea.nombreSenior = senior[0].nombreUsuario;
        tarea.nombreJunior = junior[0].nombreUsuario;
    };
    const proyectos = await dbConn.query('SELECT *, U.nombreUsuario FROM proyectos P, usuarios U WHERE P.idProyecto = ? AND U.idUsuario = P.idBoss', [idProyecto]);
    const nombreUsuario = await dbConn.query('SELECT U.nombreUsuario, U.idUsuario FROM jpm.usuarios U, jpm.puesto M WHERE U.idPuesto = 2 AND U.idPuesto = M.idPuesto');
    for (var i = 0; i < nombreUsuario.length; i++) {
        if (nombreUsuario[i].idUsuario == proyectos[0].idBoss) {
            nombreUsuario[i].selected = true;
        }
    };
    res.render('proyectos/editar_proyecto', { proyectos: proyectos[0], usuarios: nombreUsuario, tareas });
});

router.post('/editProyect/:idProyecto', async (req, res) => {
    const { idProyecto } = req.params;
    const { name, description, date1, date2, boss } = req.body;

    const newProyect = {
        nombreProyecto: name,
        descripcionProyecto: description,
        fechaInicioProyecto: date1,
        fechaFinProyecto: date2,
        idBoss: boss
    };
    await dbConn.query('UPDATE proyectos set ? WHERE idProyecto = ?', [newProyect, idProyecto]);
    req.flash('success', 'Proyecto actualizado');
    res.redirect('/proyectos');
});

module.exports = router;