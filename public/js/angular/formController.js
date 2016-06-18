app.controller('formController', function ($http, $scope) {
    console.log('yoyo');
    $scope.form={
      term:'',
      location:''
    };
    $scope.formSubmit = function () {
      $http({
        method:'POST',
        url: '/form/form',
        data:$scope.form
      }).success(function (data) {
        console.log(data);
      })
      .catch(function (err) {
        console.log(err)
      })
    }

  })
