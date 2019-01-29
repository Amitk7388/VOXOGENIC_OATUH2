const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser')
const passport = require('passport');
const expressValidator = require('express-validator')
const db = require('./db/connect')

var apiRouter = require('./routes/api');
var usersRouter = require('./routes/users');
var articlesRouter = require('./routes/articles');
var clientsRouter = require('./routes/clients');
var loginRouter = require('./routes/login');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());

app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));


app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', apiRouter).databaseConnection;
app.use('/users', usersRouter).databaseConnection;
app.use('/', articlesRouter).databaseConnection;
app.use(clientsRouter).databaseConnection;
app.use(loginRouter).databaseConnection;

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});



// error handler
var PORT = 4880
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
  
}).listen(PORT, console.log('working on the PORT '+PORT));



module.exports = app;
