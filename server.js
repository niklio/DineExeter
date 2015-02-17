require('./app/models/food');
require('./app/models/vote');

var express = require('express'),
	app = express(),
	port = process.env.PORT || 3000,
	schedule = require('node-schedule'),
	util = require('util'),

	morgan = require('morgan'),
	bodyParser = require('body-parser'),

	foodController = require('./app/controllers/food'),
	voteController = require('./app/controllers/vote'),

	scraper = require('./tasks/scrape'),

	// web_url = 'http://dineexeter-23b.herokuapp.com/';
	web_url = 'http://localhost:8888';

var scrape = schedule.scheduleJob('0 0 * * * ', function () {
	scraper.update()
});

app.use(morgan('dev'));
app.use(bodyParser());

app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', web_url);
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Content-Type', 'application/javascript');
    next();
});

var router = express.Router();

router.route('/foods').get(foodController.getFoods);

//Only use for testing, don't give away IP addresses
router.route('/votes').get(voteController.getVotes);

router.route('/vote/:food_id').post(voteController.postVote);

app.use('/api', router)

// Initial scrape
scraper.update()

app.listen(port);
console.log('DineExeter server running on port ' + port);