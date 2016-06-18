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
