const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
var methodOverride = require('method-override');
const express =  require('express');
const app = express();

const apiRouter = require('./router/prueba');


// settings

// middlewares
app.use(morgan('dev'));
 // Use the 'body-parser' middleware functions
 app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json({limit: '50mb'}));

  // Handle no valid JSON
  app.use(function(err, req, res, next) {
    res.status(400).send({
      success: false,
      message: 'JSON no válido',
      err: err
    });
  });

  // Use the 'method-override' middleware functions
  app.use(methodOverride());

  // Configure the app to handle CORS requests
  app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers',
      'X-Requested-With, Content-Type, Authorization');

    next();
  });


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// routes
app.use('/', apiRouter);

// static
app.use(express.static(__dirname + '/public'));
app.all('*', (req, res, next) => {
    res.sendFile(path.resolve('./public/index.html'))
});

app.listen(5000, () => console.log('server on port 5000'));