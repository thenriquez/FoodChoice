app.controller('authController', function($scope, $rootScope, $http, $location, $window){
  $scope.error_message = '';
  $scope.user = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: ''
  };
  $scope.register = function () {
    var req = {
      method: 'POST',
      url: '/auth/register',
      headers: {
        'Content-Type': "application/json"
      },
      data: $scope.user
    };
    $http(req).success(function (data) {
      if (data.state == 'success') {
        $scope.message = data.message;
        $location.path('/');
      }
      else {
        $scope.message = data.message.errors;
        $location.path('/register');
        $window.scrollTo(0, 0);
      }
    });
  };
  $scope.login = function () {
    var req = {
      method: 'POST',
      url: '/auth/login',
      headers: {
        'Content-Type': "application/json"
      },
      data: $scope.user
    };
    $http(req).success(function (data) {
      // console.log($scope.user)
      if (data.state == 'success') {
        $rootScope.authenticated = true;
        $rootScope.current_user = data.user;
        $scope.user = data.user;
        $rootScope.message = '';
        $location.path('/');      }
      else {
        $rootScope.message = data.message;
        $location.path('/login');
      }
    });
  };
  $scope.facebook = function () {
    $http({
      method:'post',
      url:'/auth/facebook',
      data:$scope.user
    }).success(function (data) {
      console.log(data)
    })
  }
  $scope.logout = function () {
    $http({
      method:'post',
      url:'/auth/logout',
      data:$scope.user
    }).success(function (data) {
      // $scope.user= data;
      console.log($scope.user)
    })
  }
});
