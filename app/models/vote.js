var mongoose = require('mongoose');

// Define our poem schema
var VoteSchema = new mongoose.Schema({
	userID: String,
	foodID: String,
	upvote: Boolean
});

VoteSchema.index({ userID: 1, foodID: 1}, { unique: true });

// Export the Mongoose model
module.exports = mongoose.model('Vote', VoteSchema);