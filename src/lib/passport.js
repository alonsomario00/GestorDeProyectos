const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const dbConn = require('../database');
const helpers = require('./helpers');

passport.use('local.login', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, username, password, done) => {
  const rows = await dbConn.query('SELECT * FROM usuarios WHERE correo = ?', [username]);
  if (rows.length > 0) {
    const user = rows[0];
    const validPassword = await helpers.matchPassword(password, user.clave)
    if (validPassword) {
      done(null, user, req.flash('success', 'Bienvenido ' + user.nombreUsuario + ' ' + user.apellido1 + ' ' + user.apellido2));
    } else {
      done(null, false, req.flash('message', 'Contraseña incorrecta'));
    }
  } else {
    return done(null, false, req.flash('message', 'El correo electrónico no existe'));
  }
}));

//Registro
passport.use('local.registro', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, username, password, done) => {

  const { firstname, lastname, surname, postcode, born, job, phone, adress, city, province, description } = req.body;
  let newUser = {
    nombreUsuario: firstname,
    apellido1: lastname,
    apellido2: surname,
    clave: password,
    correo: username,
    cp: postcode,
    nacimiento: born,
    idPuesto: job,
    telefono: phone,
    direccion: adress,
    ciudad: city,
    provincia: province,
    descripcion: description
  };
  newUser.clave = await helpers.encryptPassword(password);
  // Saving in the Database
  const result = await dbConn.query('INSERT INTO usuarios SET ? ', newUser);
    newUser.idUsuario = result.insertId;
    return done(null, newUser);
  }));

passport.serializeUser((user, done) => {
  done(null, user.correo);
});

passport.deserializeUser(async (correo, done) => {
  const rows = await dbConn.query('SELECT * FROM usuarios WHERE correo = ?', [correo]);
  done(null, rows[0]);
});

