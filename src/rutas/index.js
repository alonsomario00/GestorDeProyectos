const express = require('express');
const router = express.Router();
/*
		CONEXIÓN CON BD
 */
//	Esto debe aparecer en cada módulo que necesite conexión a la BD
//	Si no necesita conexión con la BD, se puede eliminar
const dbconn = require('../database');  

/*
		RUTAS
 */
//	ruta raiz (pág. de inicio sin usuario logeado)
router.get('/', (req, res) => {
    res.render('index');
});
//	ruta raiz (pág. de inicio con usuario logeado)
router.get('/inicio', (req, res) => {
	console.log('En inicio');
    res.render('layouts/inicio');
});

//Pagina de muestra
router.get('/muestra', (req, res) => {
	console.log('En inicio');
    res.render('layouts/muestra');
});

//Pantalla de proyectos
router.get('/alta-proyecto', (req, res) => {
	console.log('En alta proyecto');
    res.render('layouts/alta_proyecto');
});

router.get('/listado-proyectos', (req, res) => {
	console.log('En listado proyectos');
    res.render('layouts/listado_proyectos');
});

//Boton modificar proyectos
router.get('/modificar-proyectos', (req, res) => {
	console.log('En modificar proyectos');
    res.render('layouts/modificacion_proyectos');
});

//Boton cancelar proyecto
router.get('/cancelar-proyecto', (req, res) => {
	console.log('En cancelar proyecto');
    res.render('layouts/inicio');
});

//Boton cancelar modificacion de proyecto
router.get('/cancelar-modificacion-proyecto', (req, res) => {
	console.log('En modificar proyectos');
    res.render('layouts/inicio');
});


//Boton ver proyectos
router.get('/ver-proyectos', (req, res) => {
	console.log('En modificar proyectos');
    res.render('layouts/listado_proyectos');
});


//Pantallas de tareas
router.get('/alta-tareas', (req, res) => {
	console.log('En alta tareas');
    res.render('layouts/alta_tareas');
});

router.get('/listado-tareas', (req, res) => {
	console.log('En alta tareas');
    res.render('layouts/listado_tareas');
});


//Boton modificar tareas
router.get('/tareas', (req, res) => {
	console.log('En listado tareas');
    res.render('layouts/modificacion_tareas');
});

//Boton ver tareas
router.get('/ver-tareas', (req, res) => {
	console.log('En listado tareas');
    res.render('layouts/listado_tareas');
});

//Boton cancelar tareas
router.get('/cancelar-tareas', (req, res) => {
	console.log('En listado tareas');
    res.render('layouts/inicio');
});

//Boton cancelar modificacion de tarea
router.get('/cancelar-modificacion-tarea', (req, res) => {
	console.log('En modificar proyectos');
    res.render('layouts/inicio');
});

//Pantalla repositorio de archivos
router.get('/subir-archivo', (req, res) => {
	console.log('En modificacion de tareas');
    res.render('layouts/subir_archivo');
});

//Pantalla fichado
router.get('/fichado', (req, res) => {
	console.log('En modificacion de tareas');
    res.render('layouts/fichado');
});

//Pantalla de Inicio
router.get('/inicio', (req, res) => {
	console.log('En modificacion de tareas');
    res.render('layouts/inicio');
});

//	pantalla de salida
router.get('/salir', (req, res) => {
	console.log('Saliendo');
    res.render('layouts/muestra');
});

//	pantalla de perfil
router.get('/perfil', (req, res) => {
	console.log('En perfil');
    res.render('layouts/perfil');
});

//Crear usuario
router.get('/crear-usuario', (req, res) => {
	console.log('En crear-usuario');
    res.render('layouts/crear_usuario');
});

//Modificar usuario
router.get('/modificar-usuario', (req, res) => {
	console.log('En crear-usuario');
    res.render('layouts/modificar_usuario');
});

//Boton cancelar crear usuario
router.get('/cancelar-crear-usuario', (req, res) => {
	console.log('En modificar proyectos');
    res.render('layouts/inicio');
});

module.exports = router;