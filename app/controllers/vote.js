var mongoose = require('mongoose'),
	express = require('express');

var Vote = mongoose.model('Vote');

exports.postVote = function(req, res) {
	// Instantiate food model
	var vote = new Vote();

	// Set all attributes that come from POST request
	vote.userID = req.connection.remoteAddress;
	vote.foodID = req.body.food_id;
	vote.upvote = req.body.upvote;

	Vote.find({ userID : vote.userID, foodID : vote.foodID }, function (err, docs) {
		res.send({ message: 'User has already voted on this item' });
		return;
	});

	// Save and watch for errors
	vote.save(function (err) {
		if (err) {
			res.send({ message: 'Database error', data: err });
			return;
		}

		res.send({ message: 'Vote added to database', data: vote });
	});
}