app.controller('eventFormController', function($scope, $http, $location, $routeParams){
  $scope.eventId = $routeParams.id;
  $scope.event = {
    name: "",
    places: []
  }
  $scope.form = [];
  $scope.submitted = false;


  $scope.$watch('$viewContentLoaded', function() {
    var req = {
      method: 'POST',
      url: '/api/eventData',
      headers: {
        'Content-Type': "application/JSON"
      },
      data: {eventUrl: $scope.eventId}
    };

    $http(req).success(function(responce){
      if (responce.state === "success"){
        $scope.event = {
          name: responce.data.name,
          places: responce.data.places
        }
      }
    });
  });


  $scope.submit = function () {
    console.log($scope.form);

    var req = {
      method: 'POST',
      url: '/api/eventFormSubmit',
      headers: {
        'Content-Type': "application/JSON"
      },
      data: {
        form: $scope.form,
        eventUrl: $scope.eventId
      }
    };

    $http(req).success(function(responce){
      if (responce.state === "success"){
        console.log("Your form has been submitted!!!");
        $scope.submitted = true;
      }
    });
  };

});
