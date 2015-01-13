require('./app/models/food');
require('./app/models/vote');

var express = require('express'),
	app = express(),
	port = process.env.PORT || 3000,
	mongoose = require('mongoose'),
	schedule = require('node-schedule'),
	util = require('util'),

	morgan = require('morgan'),
	bodyParser = require('body-parser'),

	foodController = require('./app/controllers/food'),
	voteController = require('./app/controllers/vote'),

	scrapeTask = require('./tasks/scrape')

mongoose.connect('mongodb://localhost:27017/dineexeter');

var scrape = new schedule.scheduleJob({hour:0, minute:0}, scrapeTask.updateDB);

app.use(morgan('dev'));
app.use(bodyParser());

app.set('view engine', 'ejs');

var router = express.Router();

router.route('/food').get(foodController.getFoods);
router.route('/vote/:food_id').put(voteController.postVote);

app.use('/api', router)

app.listen(port);
console.log('Poetry server running on port ' + port);