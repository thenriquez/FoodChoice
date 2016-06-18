app.controller('createEventController', function($scope, $http, $location, $route, $rootScope, $window) {

  // for local testing
  var urlBegin = 'localhost:3000/eventform/';
  // develop/heroku testng
  // var urlBegin = 'http://getfoodwithfriends.herokuapp.com/eventform/'

  // fx for creatign event and inputting to mongo db
  $scope.createEvent = function () {
    $http({
      method: "POST",
      url: "/api/createEvent",
      data: $scope.newEvent
    }).success(function (data) {
      if (data.state == 'success') {
        $rootScope.message = data.message;
        $scope.newEvent.eventUrl = data.eventUrl;
        $scope.newEvent.id = data.eventId;
        $rootScope.urlPath= urlBegin + data.eventUrl;
        $location.path('/newEvent');
      } else {
        $rootScope.message = data.message;
        $location.path('/newEvent');
      }
    });
  };

// fx to add attendee from input form and add to mongo
  $scope.createAttendee = function () {
      var inData = {'attendees':$scope.attendees, 'eventId':$scope.newEvent.id}
    $http({
      method:'POST',
      url:'/api/createAttendee',
      data:inData
    })
    .then(function (data) {
      console.log('successful stuff')
      console.log(data)
      $window.location.href = '/event'
      // $location.path('/event');


    })
    .catch(function (err) {console.log(err)})
  }


// logic for adding/removing new attendees
   $scope.attendees = [];
   $scope.addfield = function () {
       $scope.attendees.push({})
   }
   $scope.getValue = function (item) {
       alert(item.value)
   }

  $scope.removeChoice = function() {
    var lastItem = $scope.attendees.length-1;
    $scope.attendees.splice(lastItem);
  };
});
