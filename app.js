var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors')

var session = require('express-session');

//for file listing
var fs =require('fs');

//for file upload
var upload = require('express-fileupload');

var indexRouter = require('./routes/index');
var viewabsRouter = require('./routes/viewabs');
var doneRouter = require('./routes/done');
var viewconfRouter = require('./routes/viewconf');
var loginRouter = require('./routes/login');
var signupRouter = require('./routes/signup');
var acceptaRouter = require('./routes/accepta');
var rejectaRouter = require('./routes/rejecta');
var submissionRouter = require('./routes/submission');
var absARouter = require('./routes/absA');
var removeORouter = require('./routes/removeO');
var removeAcRouter = require('./routes/removeAc');
var removeRRouter = require('./routes/removeR');
var removeARouter = require('./routes/removeA');
var abstractRouter = require('./routes/abstract');
var addRRouter = require('./routes/addR');
var addacRouter = require('./routes/addac');
var addOrgRouter = require('./routes/addOrg');
var createconfRouter = require('./routes/createconf');
var setpdateRouter = require('./routes/setpdate');
var setadateRouter = require('./routes/setadate');
var UploadfileRouter = require('./routes/Uploadfile');
var downloadfileRouter = require('./routes/downloadfile');
var editconfwordsRouter = require('./routes/editconfwords');
var editconfsummRouter = require('./routes/editconfsumm');
var editconfnameRouter = require('./routes/editconfname');
var viewconfmembersRouter = require('./routes/viewconfmembers');
var removePRouter = require('./routes/removeP');
var homeRouter = require('./routes/home');
var publishRouter = require('./routes/publish');
var hideRouter = require('./routes/hide');
var deletecRouter = require('./routes/deletec');
var get_all_usersRouter = require('./routes/get_all_users');

var app = express();

app.use(cors({origin: "*"}))
app.use(upload());
app.use(express.static("public"));

app.use('/static',express.static(path.join(__dirname,'uploads')));

app.use(session({
  secret : 'weblesson',
  resave : true,
  saveUninitialized : true
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/', viewabsRouter);
app.use('/', doneRouter);
app.use('/', viewconfRouter);
app.use('/', loginRouter);
app.use('/', signupRouter);
app.use('/', acceptaRouter);
app.use('/', rejectaRouter);
app.use('/', submissionRouter);
app.use('/', absARouter);
app.use('/', removeORouter);
app.use('/', removeAcRouter);
app.use('/', removeRRouter);
app.use('/', removeARouter);
app.use('/', abstractRouter);
app.use('/', addRRouter);
app.use('/', addacRouter);
app.use('/', addOrgRouter);
app.use('/', createconfRouter);
app.use('/', setpdateRouter);
app.use('/', setadateRouter);
app.use('/', UploadfileRouter);
app.use('/', downloadfileRouter);
app.use('/', editconfwordsRouter);
app.use('/', editconfsummRouter);
app.use('/', editconfnameRouter);
app.use('/', viewconfmembersRouter);
app.use('/', removePRouter);
app.use('/', homeRouter);
app.use('/', publishRouter);
app.use('/', hideRouter);
app.use('/', deletecRouter);
// app.use('/', get_all_usersRouter);
app.get('/routes/get_all_users', get_all_usersRouter.get_all_users)

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
