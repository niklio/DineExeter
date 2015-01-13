var mongoose = require('mongoose'),
	cheerio = require('cheerio'),
	request = require('request'),

	Food = mongoose.model('Food');

exports.updateDB = function() {
	parseHTML(function(foods){
		for (food in foods) {

			var food = new Food(food);

			Food.find(food, function(oldfood){
				oldfood.mealday = food.mealday
			})

			food.save(function (err) {
				if (err) {
					console.log(err)
				}

				console.log('Food added to the database')
			});
    	}
    })
}

function parseHTML(callback){
	var url = 'http://exeter.edu/student_life/14202_15947.aspx';
	request({ uri: url }, function (error, response, body) {  
  		if (error || response.statusCode !== 200) {
    		console.log('Error when contacting exeter.edu' + error)
  		}

  		foods = parseMealData(body)
  		callback(foods);
	})

}

function parseMealData(body){
	$ = cheerio.load(body)

	var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
	var meals = ['Breakfast', 'Lunch', 'Dinner']
	var dhall = ['Wetherell', 'Elm Street', '']

	var d = new Date();
	var temp = []
	var foods = {};

	var currentDhall = 'Elm Street';

	for (day in days) {
		for (meal in meals) {
			$('#lbl' + meal + day + ' p').each(function(){
				var text = $(this).text().trim()
				if(dhall.indexOf(text) < 2){
					currentDhall = text;
				} else if(dhall.indexOf(text) == 0){
					currentDhall = 'Elm Street'
				} else {
					foods.push(
						{ name: text, mealday: meal + day, iselm: dhall.indexOf(currentDhall) }
					);
				}
			});
		}
	}
	return foods;

}