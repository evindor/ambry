
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
var passport = require('passport');
var dbconf = require('./config/db');

var app = express();

var RedisStore = require('connect-redis')(express);
mongoose.connect(dbconf.mongoUrl);

// all environments
app.set('port', process.env.PORT || 3000);
app.set('env', process.env.NODE_ENV || 'development');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('rv3if*h3]idbu$ehd#i1j3uydv^%sn'));
app.use(express.session({
    store: new RedisStore(dbconf.redisConf)
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

require('./config/params.js')(app);
require('./routes.js')(app, passport);
require('./config/passport.js')(app, passport);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
