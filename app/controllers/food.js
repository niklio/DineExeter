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
	food.name = req.body.name;
	food.datemeal = req.body.datemeal;

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

exports.deleteFood = function(req, res) {
	Food.findByIdAndRemove(req.params.food_id, function (err) {
		if (err) {
			res.send(err)
		}

		res.json({ message: 'Food removed from database!'})
	});
}