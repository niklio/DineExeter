var mongoose = require('mongoose');

// Define our poem schema
var VoteSchema = new mongoose.Schema({
	userID: String,
	foodID: String,
	upvote: Boolean
});

// Export the Mongoose model
module.exports = mongoose.model('Vote', VoteSchema);