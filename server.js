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

	scraper = require('./tasks/scrape');

// var scrape = schedule.scheduleJob('* * * * *', function(){
// 	scraper.update()
// });

app.use(morgan('dev'));
app.use(bodyParser());

var router = express.Router();

router.route('/foods').get(foodController.getFoods);
router.route('/vote/:food_id').put(voteController.postVote);

app.use('/api', router)

scraper.update()
app.listen(port);
console.log('DineExeter server running on port ' + port);