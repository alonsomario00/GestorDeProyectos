const express = require('express');
const router = express.Router();

const dbConn = require('../database');
const passport = require('passport');
const { isLoggedIn } = require('../lib/auth');

// Registro
router.get('/registro', (req, res) => {
  res.render('auth/registro');
});

router.post('/registro', passport.authenticate('local.registro', {
  successRedirect: '/inicio',
  failureRedirect: '/registro',
  failureFlash: true
}));

// Login
router.get('/login', (req, res) => {
  res.render('auth/login');
});


router.post('/login', (req, res, next) => {
  // req.check('username', 'Username is Required').notEmpty();
  // req.check('password', 'Password is Required').notEmpty();
  // const errors = req.validationErrors();
  // if (errors.length > 0) {
  //   req.flash('message', errors[0].msg);
  //   res.redirect('/login');
  passport.authenticate('local.login', {
    successRedirect: '/inicio',
    failureRedirect: '/login',
    failureFlash: true
  })(req, res, next);
});

router.get('/salir', (req, res) => {
  req.logOut();
  res.redirect('/');
});


//Ruta de recuperar contraseña
router.get('/recuperar', (req, res) => {
  console.log('En perfil');
  res.render('auth/recuperar_contraseña');
});

module.exports = router;
