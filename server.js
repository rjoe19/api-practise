var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var Bear = require('./app/models/bear')
mongoose.connect('mongodb://node:node@novus.modulusmongo.net:27017/Iganiq8o');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next){
  console.log('something is happening');
  next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});
// on routes that end in /bears
router.route('/bears')

.post(function(req, res) {

    var bear = new Bear();      // create a new instance of the Bear model
    bear.name = req.body.name;  // set the bears name (comes from the request)

    // save the bear and check for errors
    bear.save(function(err) {
        if (err)
            res.send(err);

        res.json({ message: 'Bear created!' });
    });

});

.get(function(req, res) {
        Bear.find(function(err, bears) {
            if (err)
                res.send(err);

            res.json(bears);
        });
    });

    // get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
    // .get(function(req, res) {
    //     Bear.find(function(err, bears) {
    //         if (err)
    //             res.send(err);
    //
    //         res.json(bears);
    //     });
    // });



// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});
console.log('Magic happens on port ' + port);
