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
