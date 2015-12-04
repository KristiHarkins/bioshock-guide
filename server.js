var http = require('http'),
    mongoose = require('mongoose'),
    conf = require('./config/conf'),
    mLab = conf.mongoLab,
    expressServer = require('./config/expressServer'),
    env = process.env.NODE_ENV || 'production';


if(env == 'development'){
    mongoose.connect('mongodb://' + conf.mongoDB.host + '/' + conf.mongoDB.name);
}else{
    mongoose.connect('mongodb://' + mLab.user + ':' + mLab.password + '@' + mLab.host + '/' + mLab.name);
}

var app = new expressServer();
var server = http.createServer(app.expressServer);

require('./routes.js')(app);

server.listen(process.env.PORT || conf.port);