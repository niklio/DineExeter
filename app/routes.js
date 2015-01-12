var mongoose = require('mongoose'),
	Poem = mongoose.model('Poem')



module.exports = function(app, passport) {
	app.get('/', function (req, res) {
		Food.find({req.body.date}, function (err, food) {
			if (err) {
				res.send(err)
			}
			
			res.render('index.ejs', {
				food:food
			});
		})
	});
}
