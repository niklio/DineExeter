var mongoose = require('mongoose');

var Food = mongoose.model('Food');

exports.getFoods = function(req, res) {
	Food.find(function (err, foods) {
		if (err) {
			res.send(err);
		}

		res.json(foods);
	});
}

exports.postFood = function(req, res) {
	// Instantiate food model
	var food = new Food();

	// Set all food attributes that come from POST request
	food.title = req.body.title;
	food.author = req.body.author;
	food.body = req.body.body;
	if(req.body.line) {
		food.line = req.body.line
	}

	// Save food and watch for errors
	food.save(function (err) {
		if (err) {
			res.send(err);
		}

		res.send({ message: 'Food added to the database!', data: food});
	});
}

// Create endpoint /api/food/:food_id for GET
exports.getFood = function(req, res) {
	Food.findById(req.params.food_id, function (err, food) {
		if (err) {
			res.send(err);
		}

		res.json(food);
	});
}

// Create endpoint /api/food/:food_id for PUT
exports.putFood = function(req, res) {
	Food.findById(req.params.food_id, function (err, food) {
		if (err) {
			res.send(err);
		}
		food.author = req.body.author;
		food.title = req.body.title;
		food.body = req.body.body;
		if(req.body.line) {
			food.line = req.body.line
		}

		food.save(function(err) {
			if (err){
				res.send(err)
			}

			res.json(food)
		});
	});
}

// Create endpoint /api/food/:food_id for DELETE
exports.deleteFood = function(req, res) {
	Food.findByIdAndRemove(req.params.food_id, function (err) {
		if (err) {
			res.send(err)
		}

		res.json({ message: 'Food removed from database!'})
	});
}