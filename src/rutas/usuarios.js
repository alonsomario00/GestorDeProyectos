const express = require('express');
const router = express.Router();

const passport = require('passport');
const { isNotLoggedIn } = require('../lib/acceso');

//	pantalla de login (usuario)
router.get('/login', (req, res) => {
    res.render('layouts/login');
});
//	ruta para gestionar los datos de login devueltos por el formulario en '/login' (get)
router.post('/login', (req, res, next) => {
	res.redirect('/');  // Se redirige al inicio hasta que funcione  la lógica de autentificaciòn del usuario

	/*passport.authenticate('local.login', {
	  	successRedirect: '/login2',
	  	failureRedirect: '/login',
	  	failureFlash: true
	})(req,res,next);*/
});

//	pantalla de login (clave)
router.get('/login2', (req, res) => {
    res.render('layouts/login2');
});
//	ruta para gestionar los datos de login devueltos por el formulario en '/login' (get)
router.post('/login2', (req, res, next) => {
	res.redirect('/');

	/*passport.authenticate('local.login', {
	  	successRedirect: '/login2',
	  	failureRedirect: '/login',
	  	failureFlash: true
	})(req,res,next);*/
});

//	pantalla de registro
router.get('/registro', (req, res) => {
    res.render('layouts/registro');
});
//	ruta para gestionar los datos de registro devueltos por el formulario en '/registro' (get)
router.post('/registro', (req, res) => {
    res.redirect('/');
});



	/*passport.authenticate('local.registro', {
 	successRedirect: '/perfil',
 	failureRedirect: '/registro',
 	failureFlash: true
})*/
	





module.exports = router;