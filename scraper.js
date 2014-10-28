var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
var meals = ['Breakfast', 'Lunch', 'Dinner']

function getMeal(day, hour, fromMeal)
{
	var meal;
	if(hour > 18 || (hour < 8 || (hour < 12 && day==0))) meal = 0;
	else if(hour > 8 && hour < 12) meal = 1;
	else meal = 2;

	day += Math.floor((meal + fromMeal)/3);

	return meals[(meal + fromMeal) % 3] + days[day];
}

//fromMeal parameter 
function getPanel(fromMeal)
{
	var d = new Date();
	var items = [];

	$('#lbl' + getMeal(d.getDay(), d.getHours(), fromMeal) + ' p').each(
		function() 
		{
			var text = $(this).text().trim()
			if(text != ""){
				items.push(text)
			}
		});

	//Wetherell is 0th element, Elm is 1st element
	if(items.length > 0){
		return [items.slice(1, items.indexOf("Elm Street")), items.slice(items.indexOf("Elm Street") + 1)];
	} else {
		return false
	}
}