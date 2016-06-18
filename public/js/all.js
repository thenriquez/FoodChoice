var app = angular.module('mainApp', ['ngRoute', 'ngFacebook','uiGmapgoogle-maps', 'nemLogging']);

app.run(function($rootScope, $http) {
  $rootScope.authenticated = false;
  $rootScope.current_user = '';
  $rootScope.message = '';
  $http.defaults.headers.common['Accept'] = 'application/json';
   $http.defaults.headers.common['Content-Type'] = 'application/json';
  // Load the facebook SDK asynchronously
  (function(){
     // If we've already installed the SDK, we're done
     if (document.getElementById('facebook-jssdk')) {return;}

     // Get the first script element, which we'll use to find the parent node
     var firstScriptElement = document.getElementsByTagName('script')[0];

     // Create a new script element and set its id
     var facebookJS = document.createElement('script');
     facebookJS.id = 'facebook-jssdk';

     // Set the new script's source to the source of the Facebook JS SDK
     facebookJS.src = '//connect.facebook.net/en_US/sdk.js';

     // Insert the Facebook JS SDK into the DOM
     firstScriptElement.parentNode.insertBefore(facebookJS, firstScriptElement);
   }());
});

app.config(function (uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyDcaTjAeuU6Qb7DNvUy0i-MldMRfh0K3uk',
        v: '3.17',
        libraries: 'weather,geometry,visualization'
    });
})


app.config(function($routeProvider, $locationProvider, $facebookProvider){
  $facebookProvider.setAppId('1702470703324769');

  $routeProvider
    //The Welcome Cards are Displayed
    .when('/', {
      templateUrl: 'partials/welcome.html',
      controller: 'authController'
    })
    //the login display
    .when('/login', {
      templateUrl: 'partials/login.html',
      controller: 'authController'
    })
    //logout route
    .when('/logout', {
      templateUrl: 'partials/login.html',
      controller: 'authController'
    })
    //the signup display
    .when('/register', {
      templateUrl: 'partials/register.html',
      controller: 'authController'
    })
    // createEvent partial
    .when("/newEvent", {
      templateUrl:'partials/createEvent.html',
      controller: 'createEventController',
    })
      .when('/event', {
      templateUrl:'partials/event.html',
      controller:'myEventController'
    })
    //form page
    .when('/form', {
      templateUrl:'partials/form.html',
      controller: 'formController'
    })
    .when('/facebook',{
      templateUrl:'partials/facebook.html',
      controller: 'facebookController'
    })
    .when('/eventform/:id',{
      templateUrl:'/partials/eventForm.html',
      controller: 'eventFormController'
    })
    .when('/map', {
      templateUrl:'partials/maps.html',
      controller: 'googleController'
    })
    //send sms
    .when('/send', {
      templateUrl: 'partials/send.html',
      controller: 'mainController'
    })
    //user account page
    .when('/myaccount', {
      templateUrl: 'partials/myaccount.html',
      controller: 'myaccountController'
    })
    //my Events Routing
    .when('/myEvents', {
      templateUrl: 'partials/myEvents.html',
      controller: 'userEventController'
    })
    .otherwise({
        redirectTo: '/'
    });
  $locationProvider.html5Mode(true);
});

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

app.controller('facebookController', function ($scope, $facebook)  {
  $scope.isLoggedIn = false;
  $scope.login = function() {
    $facebook.login().then(function() {
      refresh();
    });
  }
  function refresh() {
    $facebook.api("/me").then(
      function(response) {
        $scope.welcomeMsg = "Welcome " + response.name;
        $scope.isLoggedIn = true;
      },
      function(err) {
        $scope.welcomeMsg = "Please log in";
      });
  }

  refresh();
});

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

app.controller("googleController", function ($scope, nemSimpleLogger) {
  nemSimpleLogger.doLog = true; //default is true
  nemSimpleLogger.currentLevel = nemSimpleLogger.LEVELS.debug;//defaults to error only
});

app.controller("googleController", function($scope, uiGmapGoogleMapApi) {
  var areaLat = 44.2126995,
      areaLng = -100.2471641,
      areaZoom = 3;
  uiGmapGoogleMapApi.then(function (maps) {
     $scope.map = { center: { latitude: areaLat, longitude: areaLng }, zoom: areaZoom };
     $scope.options = { scrollwheel: false };
 });
});

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

app.controller('userEventController', function($http, $scope, $rootScope, $location){

  $scope.events = [];

  if (!$rootScope.authenticated) {
    $location.path('/');
  } else {
    angular.element(document).ready(function () {
      var req = {
        method: 'POST',
        url: '/api/userEvents',
        headers: {
          'Content-Type': "application/JSON"
        },
        data: {
          user: $rootScope.current_user
        }
      };
      $http(req).success(function(data){
        if (data.state === "success"){
          $scope.events = data.data;
          console.log($scope.events);
        }
      });
    });
  }

  $scope.sendEvent = function (event) {
    $http({
      method:'POST',
      url: '/api/sendEvent',
      data: {id: event._id}
    }).success(function (data) {
      console.log(data)
    })
    .catch(function (err) {
      console.log(err)
    })
  }

})
