var mongoose = require('mongoose'),
	url = require('url')

var Food = mongoose.model('Food');

exports.getFoods = function(req, res) {

	Food.find(url.parse(req.url, true).query, function (err, food) {
		if (err) res.send(err);
		res.json(food);
	});
}