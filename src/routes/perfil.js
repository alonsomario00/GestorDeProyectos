const express = require('express');
const router = express.Router();

const dbConn = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/updateProfile', isLoggedIn, async (req, res, next) => {
    const usuarios = await dbConn.query('SELECT * FROM usuarios WHERE idUsuario = ?', req.user.idUsuario);
    const job = await dbConn.query('SELECT * FROM puesto')
    for (var i = 0; i < job.length; i++) {
        if (job[i].idPuesto == usuarios[0].idPuesto) {
            job[i].selected = true;
        }
    }
    res.render('layouts/perfil', { usuario: usuarios[0], puesto: job });
});

router.post('/updateProfile', async (req, res) => {
    const idUsuario = req.user.idUsuario;
    const { firstname, lastname, surname, postcode, born, job, phone, adress, city, province, description } = req.body;
    const user = {
        nombreUsuario: firstname,
        apellido1: lastname,
        apellido2: surname,
        cp: postcode,
        nacimiento: born,
        idPuesto: job,
        telefono: phone,
        direccion: adress,
        ciudad: city,
        provincia: province,
        descripcion: description
    };
    await dbConn.query('UPDATE usuarios set ? WHERE idUsuario = ?', [user, idUsuario]);
    res.redirect('/inicio');
});


module.exports = router;