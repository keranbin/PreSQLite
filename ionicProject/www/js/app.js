// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'


var example=angular.module('starter', ['ionic','ngCordova']);
var db=null;
example.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    console.log("begin to copy");
    window.plugins.sqlDB.copy("region.db", function() {
      console.log("begin to copy");
      db = $cordovaSQLite.openDB("region.db");
    }, function(error) {
      console.log("fail to copy");
      console.log(error);
      console.error("There was an error copying the database: " + error);
      db = $cordovaSQLite.openDB("region.db");
    });


  });
});
example.controller("ExampleController", function($scope, $cordovaSQLite) {
  $scope.selectAll = function() {
    var query = "SELECT * FROM abroad";
    console.log(db);
    $cordovaSQLite.execute(db, query, []).then(function(res) {
      if(res.rows.length > 0) {
        for(var i = 0; i < res.rows.length; i++) {
          console.log("SELECTED -> " + res.rows.item(i).pinyin + " " + res.rows.item(i).name);
        }
      } else {
        console.log("No results found");
      }
    }, function (err) {
      console.error(err);
    });
  }

});
