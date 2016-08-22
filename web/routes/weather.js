var Arrow = require('arrow');
var request = require('request');
var url = require('url');

var WeatherRoute = Arrow.Router.extend({
	name: 'weather',
	path: '/weather',
	method: 'GET',
	description: 'Here is the weather :)',
	action: function (req, answ , next) {
		var url_parts = url.parse(req.url, true);
		var query = url_parts.query;
		var long = query.long;
		var lat = query.lat;
		request('http://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + long + '&appid=daa5d08cec75ee9ca5cb9fdbbbec9d8c', function (error, response, body) {
		  if (!error && response.statusCode == 200) {
		  	var json = JSON.parse(body);
		  	var forecastArray = [];
		  	var fcObject = {}
		  	var city = json.city;
		  	for (var i = 0; i < json.list.length; i++) {
		  			var fcItem = json.list[i];
		  			var date = new Date(fcItem.dt*1000);
		  			if (i > 0) {
		  				var prevItem = json.list[i-1];
				  		var prevDate = new Date(prevItem.dt*1000);
				  		if (date.toString().substring(0, 3) !== prevDate.toString().substring(0, 3)) {
				  			forecastArray.push(fcObject);
				  			fcObject = {};
				  			fcObject.name = date.toString().substring(0, 10);
				  		} else {
							if (fcItem.main.temp_min - 273.15 < prevItem.main.temp_min - 273.15) {
								fcObject.minTemp = Math.round(fcItem.main.temp_min - 273.15);
							}
							if (fcItem.main.temp_max - 273.15 > prevItem.main.temp_max - 273.15) {
								fcObject.maxTemp = Math.round(fcItem.main.temp_max - 273.15);
							}
				  		}
		  			} else {
		  				fcObject.name = date.toString().substring(0, 10);
		  				fcObject.minTemp = Math.round(fcItem.main.temp_min - 273.15);
		  				fcObject.maxTemp = Math.round(fcItem.main.temp_max - 273.15);
		  			}			
		  	}
		    answ.render('weather', {data: forecastArray, city: city});
		  }
		});
	}
});

module.exports = WeatherRoute;


		
