var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var phd = require('./routes/phd');
var app = express();
var session = require('express-session')

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');
/* 删掉express默认配置jade的两行代码,注册ejs模板为html页,就是原来以.ejs为后缀的模板页，现在的后缀名可以是.html了 */
app.engine('.html', require('ejs').__express);
/* 设置视图模板的默认后缀名为.html,避免了每次res.Render("xx.html")的尴尬 */
app.set('view engine', 'html');
/* 设置模板文件文件夹,__dirname为全局变量,表示网站根目录 */
app.set('views', __dirname + '/views');



app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* session*/



app.use(session({
  secret: 'catandmorecats', // 建议使用 128 个字符的随机字符串
  cookie: { maxAge: 12 * 60 * 60 * 1000 }
}));


/*
*/

app.use('/', routes);
app.use('/phd', phd);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500).send(err.stack);
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

var port = 3030;
var host = 'localhost';
app.set('host', host);
app.set('port', port);

module.exports.siteroot = "http://"+host+":"+port;
module.exports = app;
