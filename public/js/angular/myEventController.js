app.controller('myEventController', function ($http, $scope) {
  $scope.findMyEvents = function () {
    $http({
      method:'POST',
      url: '/event/find',
      data:$scope.search
    }).success(function (data) {
      $scope.events = data;
      console.log(data)
    })
    .catch(function (err) {
      console.log(err)
    })
  }
  $scope.ShowAllEvents = function () {
    $http({
      method:'POST',
      url: '/event/all',
      data:$scope.search
    }).success(function (data) {
      $scope.events = data;
      console.log(data)
    })
    .catch(function (err) {
      console.log(err)
    })
  }
})
