var mongoose = require('mongoose'),
	url = require('url'),
	tools = require('../../tools')

	Food = mongoose.model('Food');

exports.getFoods = function(req, res) {

	var query = url.parse(req.url, true).query

	query.weekyear = tools.getWeekYear(new Date())

	Food.find(query, function (err, food) {
		if (err) res.send(err);
		res.json(food);
	});
}