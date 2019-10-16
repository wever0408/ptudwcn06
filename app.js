var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require("passport");

// Passport Config
require("./config/passport")(passport);
require('./config/passport.jwt')

var indexRouter = require('./routes/index');
var meRouter = require('./routes/me');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// PASPORT JWT

app.use('/', indexRouter);
app.use('/me', passport.authenticate('jwt', { session: false }), meRouter)

//Set up mongoose connection to cloud
var mongoose = require("mongoose");
var mongoDB =
"mongodb+srv://wever0408:wever0408@cluster0-lcolq.mongodb.net/rest-api?retryWrites=true";  
//"mongodb+srv://sa:123@cluster0-bmgef.gcp.mongodb.net/eshopping?retryWrites=true";
mongoose.connect(mongoDB, { useNewUrlParser: true });
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
