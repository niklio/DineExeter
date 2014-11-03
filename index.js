var express = require('express'),
	mongodb = require('mongodb'),
	jsdom = require('jsdom'),
	schedule = require('node-schedule'),
	cheerio = require('cheerio'),
	request = require('request');

var app = express();

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.get('/', function(request, response) {
	response.send(parseHTML())		//
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})

var scrape = new schedule.scheduleJob({hour:0, minute:0, dayOfWeek:0}, function(){

});

function getHTML(){
	var url = 'http://exeter.edu/student_life/14202_15947.aspx';
	request({ uri: url }, function (error, response, body) {  
  		if (error || response.statusCode !== 200) {
    		console.log('Error when contacting exeter.edu')
    		console.log(error)
  		}
  		
  		getMealData(body)
	})

}

function getMealName(day, hour, mealIndex)
{
	var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
	var meals = ['Breakfast', 'Lunch', 'Dinner']
	var meal;

	if(hour > 18 || (hour < 8 || (hour < 12 && day==0))) meal = 0;
	else if(hour > 8 && hour < 12) meal = 1;
	else meal = 2;

	day += Math.floor((meal + mealIndex)/3);

	return meals[(meal + mealIndex) % 3] + days[day];
}

function getMealData(body){
	$ = cheerio.load(body)

	var d = new Date();
	var foods = [];

	$('#lbl' + getMealName(d.getDay(), d.getHours(), 0) + ' p').each(
		function(){
			var text = $(this).text().trim()
			if(text != ""){
				foods.push(text)
				console.log(text)
			}
		}
	);

	// var middleString = "Elm Street";

	// if(foods.length > 0){
	// 	return [foods.slice(1, foods.indexOf(middleString)), foods.slice(foods.indexOf("Elm Street")+1)];
	// }



 	// var d = new Date();
	// var foods = [];

	// $('#lbl' + getMealName(d.getDay(), d.getHours(), mealIndex) + ' p').each(
	// 	function() 
	// 	{
	// 		var text = $(this).text().trim()
	// 		if(text != ""){
	// 			foods.push(text)
	// 		}
	// 	});

	// //Wetherell is 0th element, Elm is 1st element
	// if(foods.length > 0){
	// 	return [foods.slice(1, foods.indexOf("Elm Street")), foods.slice(foods.indexOf("Elm Street") + 1)];
	// } else {
	// 	return false
	// }

}
getHTML()
// getMealData(getHTML(), 0);		//Call on server start to streamline dev process