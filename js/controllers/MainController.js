app.controller('ForecastController', ['$scope', 'forecast', function($scope, forecast) {
	$scope.search = function(){
		forecast.search($scope.keywords).then(function(response){
			$scope.response = response.data;
			console.log("$scope.keywords from the controller: " + $scope.keywords);
			console.log("response.data " + response.data);
			$scope.tenDay = response.data;
		});
	}
}]);

app.controller('MainCtrl', function($scope, $http) {
  console.log('MainCtrl controller has run');
  // $scope.results = [];

  // pulls the zipcode from GMaps API call
  $scope.getMyAddr = function() {
    navigator.geolocation.getCurrentPosition(function(pos) {
      var latlng = pos.coords.latitude +","+ pos.coords.longitude;
      // console.log('geolocation: '+latlng);
			$http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latlng + '&key=AIzaSyC4Ci51DjN4v2KeWjPZECP40QOBC3iXpp8')
        .success(function(data){
          console.log('geocode: ', data);
          $scope.results = data.results;
          zipcode = data.results[0].address_components[7].long_name;
          // limit the ng-repeat to 1
          $scope.quantity = 1;
          console.log("THE ZIP IS: " + zipcode );

        });
    }, function(error) {
      alert('Unable to get location: ' + error.message);
    });
  }

});


app.controller('MainCtrl', function($scope, $http) {
	console.log("DROPZIP has run");
	$scope.dropZip = function(zipcode) {

		navigator.geolocation.getCurrentPosition(function(pos) {
      var latlng = pos.coords.latitude +","+ pos.coords.longitude;
      // console.log('geolocation: '+latlng);
			$http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latlng + '&key=AIzaSyC4Ci51DjN4v2KeWjPZECP40QOBC3iXpp8')
        .success(function(data){
          $scope.results = data.results;
          zipcode = data.results[0].address_components[7].long_name;

				console.log(zipcode);
		  	$http.get('http://api.wunderground.com/api/2e91cf72317737fc/forecast10day/q/' + zipcode + '.json')
		    .success(function(data) {
		      $scope.response = data.response;
		      console.log($scope.response);
		      $scope.quantity = 1;
					$scope.tenDay = data;

		    })
      });

    }, function(error) {
      alert('Unable to get location: ' + error.message);
    });

 	}
});


