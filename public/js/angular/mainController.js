app.controller('mainController', function($scope, $rootScope, $http){

  $scope.submitted = false;

  $scope.numbers = [{
      phoneNum: ""
    }];

  $scope.addNum = function () {
    $scope.numbers.push({
      phoneNum: ""
    });
  }

  $scope.subNum = function () {
    $scope.numbers.pop();
  }

  $scope.sms = function(){
    var req = {
      method: 'POST',
      url: '/api/sendSMS',
      headers: {
        'Content-Type': "application/JSON"
      },
      data: {
        numbers: $scope.numbers,
        url: $rootScope.urlPath
      }
    };
    $http(req).success(function(data){
      if (data.state === "success"){
        $scope.submitted = true;
        console.log(data);
      }
    });
  };
});
