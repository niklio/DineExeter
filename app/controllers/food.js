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
		async.each(foods, function (food, callback) {
			if (err) res.send(err);
			userHasVoted(userID, food._id, function (vote) {
				food.vote = vote
				callback()
			});
		},
		function (err) {
			console.log(foods)
			res.json(foods);
		});
	});
}

function userHasVoted(userID, foodID, callback) {
	Vote.find({userID: userID, foodID: foodID}, function (err, doc) {
		if (err) {
			return { message: 'Database error', error: err};
		}

		if (doc.upvote != null) callback(doc.upvote);
		else callback(null);
	})
}