// AUTO LOCATION
app.controller('MainController', ['$scope', '$http', '$resource', 'daysService', function($scope, $http, $resource, daysService) {
	navigator.geolocation.getCurrentPosition(function(pos) {
		var lat = pos.coords.latitude;
		var lon = pos.coords.longitude;
		var latlng = pos.coords.latitude +","+ pos.coords.longitude;

		$http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latlng + '&key=AIzaSyC4Ci51DjN4v2KeWjPZECP40QOBC3iXpp8')
			.success(function(data){
				$scope.results = data.results;
				zipcode = data.results[0].address_components[7].long_name;
				console.log(zipcode)
			$scope.city = zipcode;
			$scope.days = daysService.days;
			// a new scope property for the number of days to forecast
			// to make it match the bg-primary class need to make it a string (because of the ===)
			// $scope.days = $routeParams.days || '4'; // default to 4

			// for the 5 day forecast date and temp
			$scope.weatherAPI = $resource('http://api.openweathermap.org/data/2.5/forecast/daily', {callback: 'JSON_CALLBACK'}, {get: {method: 'JSONP'}});
			// passing lat/lon (the position) and $scope.days (no of days) into the API request
			$scope.weatherResult = $scope.weatherAPI.get({ zip: zipcode, cnt: $scope.days, units: "imperial", APPID: '8a70acaa3e2099b0af9f591707b823df' });

			// for the current conditions
			$scope.currentweatherAPI = $resource('http://api.openweathermap.org/data/2.5/weather', {callback: 'JSON_CALLBACK'}, {get: {method: 'JSONP'}});
			$scope.currentWeathular = $scope.currentweatherAPI.get({ zip: zipcode, units: "imperial", APPID: '8a70acaa3e2099b0af9f591707b823df' });

			// $scope.currentWeathular.$promise.then(function onFulfilled(data) {
			// 	var conditionsNow = $scope.currentWeathular;
		 	// });

			$scope.convertToInt = function(dec){
				return Math.round(dec);
			}
			$scope.convertToDate = function(date){
				return new Date(date * 1000);
			}
		});
	}, function(error) {
		alert('Unable to get location: ' + error.message);
	});
}]);




// USER'S LOCATION DISPLAY
app.controller('LocationController', function($scope, $http) {
	$scope.getLocation = function() {
		// get the location from the HTML navigator
		navigator.geolocation.getCurrentPosition(function(pos) {
			var latlng = pos.coords.latitude +","+ pos.coords.longitude;

			$http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latlng + '&key=AIzaSyC4Ci51DjN4v2KeWjPZECP40QOBC3iXpp8')
				.success(function(data){
					$scope.results = data.results;
					$scope.quantity = 1;
			});

		}, function(error) {
			alert('Unable to get location: ' + error.message);
		});

 	}
});



