const http = require('http')
const express = require('express')
const routes = require('./routes')
const logger = require('morgan')
const methodOverride = require('method-override')
const session = require('express-session')
const bodyParser = require('body-parser')
const multer = require('multer')
const errorHandler = require('errorhandler')
const database = require('./Database/database');
const app = express()
const upload = multer({ dest: 'uploads/' });

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


// all environments
database.connectToMongo();
app.set('port', process.env.PORT || 3001)
app.use(logger('dev'))
app.use(methodOverride())
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'uwotm8'
}))
app.use(bodyParser.json());
app.use('/uploads',express.static('./uploads'));
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/api/games', routes);


// error handling middleware should be loaded after the loading the routes
if (app.get('env') === 'development') {
  app.use(errorHandler())
}

const server = http.createServer(app)
server.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'))
})
