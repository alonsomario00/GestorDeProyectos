const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index');
});

module.exports = router;


// //Editar usuario
// router.get('/perfil/:idUsuario', async (req, res) => {
//   //  obtengo el id del registro a modificar desde la url
//   const { idUsuario } = req.params;
//   //  leo el registro correspondiente de la BD y asigno los valores a perfil
//   const perfiles = await dbconn.query('SELECT * FROM usuarios WHERE id = ?', [idUsuario]);
//   //  visulizao la vista de editar perfil pasándole los parametros
//   res.render('perfil', { perfil: perfiles[0] });
// });

// //Ruta para cambiar en la BD
// router.post('/editar', (req, res) => {
//   console.log(req.body);
//   res.send('Recibido desde modificar el enlace de usuario en la BD');
// });

// //	ruta para form de borrar enlace
// router.get('/eliminar/:idUsuario', async (req, res) => {
//   const { idUsuario } = req.params;
//   console.log(idUsuario);
//   await dbconn.query('DELETE FROM usuario WHERE id = ?', [idUsuario])
//   res.redirect('/usuario');
// });


// //Ruta para listar los usuarios
// router.get('/', async (req, res) => {
//   const perfiles = await dbconn.query('SELECT * FROM usuarios');
//   res.render('layouts/perfil', { perfiles });
//   //res.send('Listado');
// });


/*
		RUTAS
 */
//	ruta raiz (pág. de inicio sin usuario logeado)

// //	ruta raiz (pág. de inicio con usuario logeado)
// router.get('/inicio', (req, res) => {
//   console.log('En inicio');
//   res.render('inicio');
// });

// //Crear usuario
// router.get('/crear-usuario', (req, res) => {
//   console.log('En crear-usuario');
//   res.render('layouts/crear_usuario');
// });

// //Modificar usuario
// router.get('/modificar-usuario', (req, res) => {
//   console.log('En crear-usuario');
//   res.render('layouts/modificar_usuario');
// });