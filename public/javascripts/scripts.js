/**
 * Created by RFreeman on 10/12/2016.
 */

// create the angular application with a dependency on the angular ui router library (for http calls and routing)
var app = angular.module('GameApp', ['ui.router']);

// angular factory for accessing the node controller
app.factory('GameFactory', ['$http', function($http) {

    // initialize an empty games list
    var g = {
        games: []
    };

    // GET
    g.getGames = function() {
        // call the get method in the express controller at /games
        // if we get data back, copy it to the games array in memory
        return $http.get('/games').success(function(data) {
          angular.copy(data, g.games);
        });
    };

    // ADD
    g.addGame = function(game) {
      return $http.post('/games', game).success(function(data) {
         g.games.push(game);
      });
    };

    // return the games to controller
    return g;

}]);
// end factory

// angular controller for accessing the factory and the html layers
app.controller('GameController', ['$scope', 'GameFactory', function($scope, GameFactory) {

    // GET
    $scope.getGames = function() {
        GameFactory.getGames().then(function(response) {
          // copy the response to a scope-level array so it's available in the view
            $scope.games = response.data;
        });
    };

    // ADD
    $scope.addGame = function() {
        // 1. call the factory's add method and pass it the game object from the form
        GameFactory.addGame($scope.game);

        // 2. refresh the game list
        $scope.getGames();

        // 3. clear the input form
        $scope.game = null;
    };

}]);
// end controller

