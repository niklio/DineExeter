var mongoose = require('mongoose');

var Food = mongoose.model('Food');

exports.getFoods = function(req, res) {
	Food.find(function (err, food) {
		if (err) {
			res.send(err);
		}

		res.json(food);
	});
}