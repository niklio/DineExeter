var mongoose = require('mongoose'),
	express = require('express');

var Vote = mongoose.model('Vote');

exports.postVote = function(req, res) {

	// Instantiate food model
	var vote = new Vote();

	if (req.body.upvote == null) {
		res.send({ message: "Specify upvote parameter in request body"})
		return;
	}

	// Set all attributes that come from POST request
	vote.userID = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
	vote.foodID = req.params.food_id || req.body.food_id;
	vote.upvote = req.body.upvote;

	Vote.find({ userID : vote.userID, foodID : vote.foodID }, function (err, doc) {
		if (err) {
			res.send({ message: 'Database error', data: err });
			return;
		}
		if (doc.length == 0) {
			vote.save(function (err) {
				if (err) {
					res.send({ message: 'Database error', data: err });
					return;
				}
				res.send({ message: 'Vote added to database', data: vote });
				return;
			});
		}
		else res.send({ message: 'User has already voted on this item' });

	});
}

exports.getVoteCount = function(req, res) {
	Vote.count({ food_id: req.body.food_id }, function (err, total){
		Vote.count({ food_id: req.body.food_id, upvote: true }, function (err, up){
			res.send({data: { total: total, upvotes: up}})
			return;
		})
	})
}

exports.getVotes = function(req, res) {
	Vote.find(function (err, food) {
		if (err) {
			res.send(err);
		}

		res.json(food);
	});
}

exports.userHasVoted = function(req, res) {

	var userID = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
	var foodID = req.params.food_id;

	Vote.find({userID: userID, foodID: foodID}, function (err, doc) {
		if (err) {
			res.send({ message: 'Database error', error: err});
			return;
		}
		console.log(foodID)
		if (doc != null) res.send(doc)
		else res.send(false)
		return;
	})
}