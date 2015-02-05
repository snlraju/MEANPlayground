var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var mongoose = require('mongoose');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

//Connect to Mongoose
mongoose.connect('mongodb://localhost/imdb', function(err) {
    if(err) {
        console.log('Connection error', err);
    } else {
        console.log('Connection succesful');
    }
});

//Mongoose Model
var imdbSchema = new mongoose.Schema({
    name: String
}, { collection: 'tamil' });

var movie = mongoose.model('imdb', imdbSchema, 'tamil');

//Mongoose Insert
var m1 = new movie({name: 'Nayagan'});
m1.save(function(err){
    if(err)
        console.log('Error', err);
    else
        console.log('Movie inserted', m1);
});


//Mongoose Update
var updatemovie = new movie({name: 'Enthiran'});
var upsertData = updatemovie.toObject();
delete upsertData._id;
movie.update({name: 'Vettayadu Vilayadu'}, upsertData, {upsert: true}, function(err){});

//--------------------------------------------------------------

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
