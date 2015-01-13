var cheerio = require('cheerio'),
	request = require('request');

module.exports = function() {
	db.open(function(err, db) {
		if (err) {
			console.log("Error connecting to your mom");
			return;
		}

        db.collection(collection_name, {strict:true}, function(err, collection) {
        	if (err) {
        		console.log("The " + collection_name + "collection doesn't exist.  Populating it with available data");
        		parseHTML(function(foods){
                	db.collection(collection_name, function(err, collection) {
	                	collection.insert(foods, {safe:true}, function(err, result) {});
	        		})
                });
                return;
        	}

        	console("Updating " + collection_name + "with available data");
            parseHTML(function() {});
        });
	});
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
	var dhall = ['','Wetherell', 'Elm Street']

	var d = new Date();
	var temp = []
	var foods = {};

	var currentDhall = 'Elm Street';

	for (var i = 0; i < days.length; i++) {
		foods[days[i]] = {};
		for (var k = 0; k < meals.length; k++) {
			foods[days[i]][meals[k]]={'Wetherell':[], 'Elm Street':[]}
			$('#lbl' + meals[k] + days[i] + ' p').each(function(){
				var text = $(this).text().trim()
				if(dhall.indexOf(text) > 0){
					currentDhall = text;
				} else if(dhall.indexOf(text) == 0){
					currentDhall = 'Elm Street'
				} else {
					foods[days[i]][meals[k]][currentDhall].push(text);
				}
			});
		}
	}
	return foods;

}