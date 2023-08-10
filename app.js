var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const jsonwebtoken = require("jsonwebtoken");
const flash = require('connect-flash');

var indexRouter = require('./routes/index.routes');
var usersRouter = require('./routes/user.routes');
var productRouter = require('./routes/product.routes');
var orderRouter = require('./routes/order.routes');
var loginRouter = require('./routes/login.routes');
var roleRouter = require('./routes/role.routes');

// thêm thư viện mongoose để kết nối vớ mongodb
const mongoose = require('mongoose');
// kết nối mongodb
mongoose.connect('mongodb+srv://admin:admin@manufacture.t4sljxx.mongodb.net/?retryWrites=true&w=majority', {useNewUrlParser: true});
const db = mongoose.connection;
//Bắt sự kiện error
db.on('error', function(err) {
  if (err) console.log(err)
});
//Bắt sự kiện open
db.once('open', function() {
  console.log("Kết nối database thành công !");
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(function(req, res, next){
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function(err, decode){
      if(err) req.user = undefined;
      req.user = decode;
      next()
    });
  } else {
    req.user = undefined;
    next();
  }
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'serect',
  cookie: {maxAge:6000},
  resave: false,
  saveUninitialized: false
}));
app.use(flash());

app.use('/', indexRouter);
app.use('/', usersRouter);
app.use('/product',productRouter);
app.use('/order',orderRouter);
app.use('/login', loginRouter);
app.use('/role', roleRouter);


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
