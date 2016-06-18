app.controller('myaccountController', function($http, $scope){

  $scope.users = {
    firstName: '',
    lastName:''
  }

  $scope.myAccount = function(){
    $http({
      method:'POST',
      url: '/acc/myaccount',
      data:$scope.users
    }).success(function (users){
      console.log(users);
      $scope.users.firstName = users.firstName;
      $scope.users.lastName = users.lastName;
      $scope.users.createdAt = users.createdAt;
    }).catch(function(err){
      console.log(err)
    })
  }
  $scope.myAccount();
})
