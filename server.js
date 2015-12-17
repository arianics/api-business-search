var express = require('express');
var bodyParser = require('body-parser');
var Yelp = require('yelp');
var yelpConfig = require('./yelp-config.js');

var port = process.env.PORT || 3001;
var app = express();
var router = express.Router();
var yelp = new Yelp(yelpConfig);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

router.get('/', function(req, res) {
  res.send({
    message: 'Welcome to our api :)'
  });
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3002");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router.route('/yelp-search')
.post(function(req, res, next) {
  yelp.search(req.body)
  .then(function (data) {
    console.log(data);
    res.json(data);
  })
  .catch(function (err) {
    console.error(err);
  });
});

app.use('/', router);

app.listen(port);
console.log('Runnig on port ' + port);