var express = require('express'),
	mongo = require('mongodb'),
	jsdom = require('jsdom'),
	schedule = require('node-schedule'),
	cheerio = require('cheerio'),
	request = require('request'),
	util = require('util');

var app = express();

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true}),
	db = new Db('db', server);

var collection_name = 'dinexeter'

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to database");
        db.collection(collection_name, {strict:true}, function(err, collection) {
        	var callback = function(){
                db.collection(collection_name, function(err, collection) {
	                collection.insert(foods, {safe:true}, function(err, result) {});
	        	})
        	};
            if(!err) {
            	console("Updating " + collection_name + "with available data");
            	callback = function(foods){

            	}
            }else{
                console.log("The " + collection_name + "collection doesn't exist.  Populating it with available data")
                callback = function(foods){
                	db.collection(collection_name, function(err, collection) {
	                	collection.insert(foods, {safe:true}, function(err, result) {});
	        		})
                }
            }
            parseHTML(callback)
        });
    } else {
    	console.log("Error connecting to database");
    }
});

var scrape = new schedule.scheduleJob({hour:0, minute:0, dayOfWeek:0}, function(){

});

function parseHTML(callback){
	var url = 'http://exeter.edu/student_life/14202_15947.aspx';
	request({ uri: url }, function (error, response, body) {  
  		if (error || response.statusCode !== 200) {
    		console.log('Error when contacting exeter.edu')
    		console.log(error)
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
// parseHTML(function(foods){
// 	console.log(util.inspect(foods, false, null));
// }) //Calling on server start to streamline dev process


app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.get('/', function(request, response) {
	response.send(parseHTML())		//
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})