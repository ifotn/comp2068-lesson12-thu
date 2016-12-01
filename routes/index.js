var express = require('express');
var router = express.Router();

// link to the Game model
var Game = require('../models/game');

// GET
router.get('/', function(req, res, next) {
  res.render('index');
});

// GET /games
router.get('/games', function(req, res, next) {
  // use the model to get games from db
  Game.find(function(err, games) {
    if (err) {
      return next(err);
    }

    res.json(games);
  });
});

// POST /games
router.post('/games', function(req, res, next) {
  var newGame = new Game(req.body);

  // use mongoose to save
  newGame.save(function(err, game) {
    if (err) {
      return next(err);
    }

    res.json(game);
  });
});

// make public
module.exports = router;

