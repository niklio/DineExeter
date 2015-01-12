var mongoose = require('mongoose');

// Define our poem schema
var FoodSchema   = new mongoose.Schema({
	name: String
});

// Export the Mongoose model
module.exports = mongoose.model('Food', PoemSchema);
