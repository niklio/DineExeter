var mongoose = require('mongoose'),
	url = require('url'),
	async = require("async");
	tools = require('../../tools')

	Food = mongoose.model('Food'),
	Vote = mongoose.model('Vote');

exports.getFoods = function(req, res) {

	var userID = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
	var query = req.query

	query.weekyear = tools.getWeekYear(new Date())

	Food.find(query, function (err, foods) {
		votesCache = {};

		async.each(foods, function (food, callback) {
			if (err) res.send(err);

			userHasVoted(userID, food._id, function (vote) {
				votesCache[food._id] = vote;
				callback()
			});


		},
		function (err) {
			for (var i = 0; i < foods.length; i++) {
				foods[i] = foods[i].toJSON();
				foods[i]["vote"] = votesCache[foods[i]._id];
			}
			res.json(foods);
		});
	});
}

function userHasVoted(userID, foodID, callback) {
	Vote.find({userID: userID, foodID: foodID}, function (err, doc) {
		if (err) {
			return { message: 'Database error', error: err};
		}

		return callback(doc[0])
	})
}