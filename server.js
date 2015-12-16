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

router.route('/yelp-search')
.post(function(req, res) {
  yelp.search({ term: 'food', location: 'glendale, ca' })
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