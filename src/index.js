const express = require('express');
const morgan = require('morgan');
const {engine} = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')
const { database } = require('./keys');



// Inizialiciaciones
const app = express();


//Configuraciones
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'), 
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars') 
}));
app.set('view engine', 'hbs');


// Midlewares/
app.use(session({
    secret: 'nodepracticasessions',
    resave: false,
    saveUninitialized: false, 
    store: new MySQLStore(database)
}));


app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());



// Variables Globales
app.use((req, res, next) =>{
  app.locals.exitoso = req.flash('exitoso');
    next();
})



//  Rutas   
app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use('/links',require('./routes/links'));


// Public
app.use(express.static(path.join(__dirname, 'public')));

// Encendido del servidor
app.listen(app.get('port'), () =>{
    console.log('Servidor corriendo en', app.get('port'));
});