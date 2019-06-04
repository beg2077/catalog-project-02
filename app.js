var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const flash = require('connect-flash');
const passport = require('passport');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

// все для бд
mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://loftschool:567234@ds123080.mlab.com:23080/myportfolio', {useMongoClient: true});
mongoose.connect('mongodb://localhost/chat', {useMongoClient: true});
												//:27017
/*app.use(session({
	secret: config.get('session:secret'),
	key:    config.get('session:key'),
	cookie: config.get('session:cookie'),
	resave: true,
	saveUninitialized: true,
	store: new MongoStore({ mongooseConnection: mongoose.connection })
})); */       // connect.sid

require('./models/user');
require('./models/logintoken');
require('./models/catalogMain');

// routes - маршруты подключение - модульные, монтируемые обработчики маршрутов
const index = require('./routes/index');
const reg = require('./routes/reg');
const tokenReq = require('./routes/login-token');
const catalogMain = require('./routes/catalogMain');

const app = express();

// view engine setup // движок шаблонов
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'secret',
  key: 'keys',
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: null
  },
  saveUninitialized: false,
  resave: false,
  store: new MongoStore({mongooseConnection: mongoose.connection})
}));
app.use(flash()); // подключение сообщения

// работа с "passport"
require('./config/config-passport');
app.use(passport.initialize());
app.use(passport.session());

// routes - маршруты вызов - модульные, монтируемые обработчики маршрутов
app.use('*', tokenReq);         // Это для всех ?!
app.use('/', index);            //  нужно послушать в лекции
app.use('/registration', reg);
app.use('/catalogMain', catalogMain);

// обработка ошибок --------------------------------------------
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req
    .app
    .get('env') === 'development'
    ? err
    : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
