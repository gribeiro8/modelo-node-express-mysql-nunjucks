var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var consign = require('consign');
var session = require('express-session');
var flash = require('express-flash');
var MySQLStore = require('express-mysql-session')(session);
const nunjucks = require("nunjucks"); 
var moment = require('moment');
var formatardinheiro = require('format-currency-to-br');
var fileUpload = require('express-fileupload');
const dinheiro = require('../app/middleware/dinheiro');

var app = express();


var config = require('../config.json');
var local = process.argv[2]=='3000' ? 'local' : 'servidor';

// view engine setup
//app.set('views', './app/views');
//app.set('view engine', 'ejs');

nunjucks.configure('app/views', {
  autoescape: true,
  express: app
});

//console.log(express.static(path.join(__dirname, 'public')));
//app.use('/', express.static('./public'));
console.log(process.env.PWD+'/public');
app.use('/', express.static(process.env.PWD+'/public'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(flash());
app.use(fileUpload());



var sessionStore = new MySQLStore({
    host: config[local].host,
    user: config[local].user,
    password: config[local].password,
    database: config[local].database,
    socketPath: config[local].socketPath
});

app.use(session({
  key: 'session_cookie_name',
  secret: 'session_cookie_secret',
  store: sessionStore,
  resave: false,
  saveUninitialized: false
}));

moment.locale('pt-BR');

app.use(function (req,res,next) {
  res.locals.moment = moment;
  res.locals.formatardinheiro = formatardinheiro;
  res.locals.loginusuario = req.session.loginusuario;
  res.locals.caminhostatic = config[local].pastastatic;
  res.locals.dinheiro = dinheiro;

  next();
});
global.caminhostatic = config[local].pastastatic;  

app.use(session({
   key: 'session_cookie_name',
   secret: 'session_cookie_secret',
   store: sessionStore,
   resave: false,
   saveUninitialized: false
}));

consign({cwd:'app',locale: 'pt-br',})
  .include('controller')
  .then('routes')
  .then('config')
  .then('models')
.into(app);

module.exports = app;
