/*
    Se cargan los módulos necesarios como objetos de instancias con el mismo nombre
*/

const express = require('express');
const morgan = require('morgan');
const path = require('path');
const exphbs = require('express-handlebars');
const session = require('express-session');
const validator = require('express-validator');
const passport = require('passport');
const flash = require('connect-flash');
const MySQLStore = require('express-mysql-session')(session);
const bodyParser = require('body-parser');

const { database } = require('./keys')

const fileUpload = require('express-fileupload');

/*
    INICIALIZACIONES
*/

const app = express();
require('./lib/passport');

/*
    PARAMETRIZACIÓN
*/
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs',
  helpers: require('./lib/handlebars')
}))
app.set('view engine', '.hbs');

/*
    MIDDLEWARES
*/
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
  secret: 'faztmysqlnodemysql',
  resave: false,
  saveUninitialized: false,
  store: new MySQLStore(database)
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(validator());

/*
    VARIABLES GLOBALES
*/
app.use((req, res, next) => {
  app.locals.message = req.flash('message');
  app.locals.success = req.flash('success');
  app.locals.user = req.user;
  next();
});

/*
    RUTAS
*/
app.use(require('./routes/index'));
app.use(require('./routes/authentication'));
app.use('/inicio', require('./routes/postLogin'));
app.use('/proyectos', require('./routes/proyectos'));
app.use('/tareas', require('./routes/tareas'));
app.use('/repositorio', require('./routes/repositorio'));
app.use('/fichado', require('./routes/fichado'));
app.use('/perfil', require('./routes/perfil'));

/*
    PÚBLICO
*/
app.use('/static', express.static(path.join(__dirname + '/public')));

/*
    ARRANQUE SERVIDOR
*/
app.listen(app.get('port'), () => {
  console.log('Servidor escuchando en el puerto', app.get('port'));
});