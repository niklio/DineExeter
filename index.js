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

  		parseMealData(body)
	})

}

function parseMealData(body){
	$ = cheerio.load(body)

	var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
	var meals = ['Breakfast', 'Lunch', 'Dinner']
	var dhall = ['Wetherell', 'Elm Street']

	var d = new Date();
	var temp = []
	var foods = {};

	var currentDhall;

	for (var i = 0; i < days.length; i++) {
		foods[days[i]] = {};

		for (var k = 0; k < meals.length; k++) {
			foods[days[i]][meals[k]]={'Wetherell':null, 'Elm Street':null}
			$('#lbl' + meals[k] + days[i] + ' p').each(
				function(){
					var text = $(this).text().trim()
					if(text == ""){
						return;
					}
					if(dhall.indexOf(text)!=-1){
						currentDhall = text;
					}

					foods[days[i]][meals[k]][currentDhall] += text;

				}
			);

		}
	}
	console.log(foods);

}
getHTML() //Calling on server start to streamline dev process