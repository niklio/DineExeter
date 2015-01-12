var express = require('express'),
	mongo = require('mongodb'),
	schedule = require('node-schedule'),
	util = require('util');

var app = express();

mongoose.connect('mongodb://localhost:27017/dineexeter');

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser());

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

// parseHTML(function(foods){
// 	console.log(util.inspect(foods, false, null));
// }) //Calling on server start to streamline dev process


app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.get('/', function(request, response) {
	response.send(parseHTML())
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})