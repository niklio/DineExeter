//Client side script to retrieve meal data, must be reimplemented in node

var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
var meals = ['Breakfast', 'Lunch', 'Dinner']

function getMealName(day, hour, mealIndex)
{
	var meal;
	if(hour > 18 || (hour < 8 || (hour < 12 && day==0))) meal = 0;
	else if(hour > 8 && hour < 12) meal = 1;
	else meal = 2;

	day += Math.floor((meal + mealIndex)/3);

	return meals[(meal + mealIndex) % 3] + days[day];
}

//mealIndex parameter 
function getFoods(mealIndex)
{
	var d = new Date();
	var foods = [];

	$('#lbl' + getMealName(d.getDay(), d.getHours(), mealIndex) + ' p').each(
		function() 
		{
			var text = $(this).text().trim()
			if(text != ""){
				foods.push(text)
			}
		});

	//Wetherell is 0th element, Elm is 1st element
	if(foods.length > 0){
		return [foods.slice(1, foods.indexOf("Elm Street")), foods.slice(foods.indexOf("Elm Street") + 1)];
	} else {
		return false
	}
}