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

    // DELETE
    g.deleteGame = function(_id, index) {
        return $http.delete('/games/' + _id).success(function(data) {
           // remove from the local array
            g.games.splice(index, 1);
        });
    };

    // SELECT
    g.selectGame = function(_id) {
        return $http.get('/games/' + _id).success(function(data) {
        });
    };

    // UPDATE
    g.updateGame = function(game) {
      return $http.put('/games/' + game._id, game).success(function(data)  {
            // refresh local array
            g.getGames();
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
        GameFactory.addGame($scope.currentGame);

        // 2. refresh the game list
        $scope.getGames();

        // 3. clear the input form
        $scope.clearGame();
    };

    // DELETE
    $scope.deleteGame = function(_id, index) {
        if (confirm('This game is really fun...are you sure??')) {
            // 1. call the Factory's delete method
            GameFactory.deleteGame(_id, index);

            // 2. refresh the game list
            $scope.getGames();
        }
    };

    // SELECT GAME
    $scope.selectGame = function(_id) {
         GameFactory.selectGame(_id).then(function(response) {
            $scope.currentGame = response.data;
        });
    };

    // CLEAR FORM
    $scope.clearGame = function() {
        $scope.currentGame = null;
    };

    // UPDATE
    $scope.updateGame = function() {
        console.log($scope.currentGame);
        // 1. call the Factory's update method
        GameFactory.updateGame($scope.currentGame);

        // 2. refresh the list
        $scope.getGames();

        // 3. clear the form
        $scope.clearGame();
    }
}]);
// end controller

