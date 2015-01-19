var mongoose = require('mongoose');

// Define our poem schema
var FoodSchema = new mongoose.Schema({
	name: String,
	mealday: String,
	// 0 - weth, 1 - elm
	iselm: Boolean,
	weekyear: Number
});

// Export the Mongoose model
module.exports = mongoose.model('Food', FoodSchema);
