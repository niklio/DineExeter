var express = require('express'),
	mongo = require('mongodb'),
	schedule = require('node-schedule'),
	util = require('util'),

	foodController = require('./app/controllers/food');
	voteController = require('./app/controllers/vote');

var app = express();

mongoose.connect('mongodb://localhost:27017/dineexeter');

var scrape = new schedule.scheduleJob({hour:0, minute:0, dayOfWeek:0}, function(){

});

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser());

app.set('view engine', 'ejs');

var router = express.Router();

router.route('/food')
	.get(foodController.getFood);

router.route('/vote/:food_id')
	.put(voteController.postVote);

app.listen(port);
console.log('Poetry server running on port ' + port);