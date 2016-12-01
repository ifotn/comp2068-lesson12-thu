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

// DELETE /games/_id
router.delete('/games/:_id', function(req, res, next) {
  var _id = req.params._id;

  Game.remove({ _id: _id }, function(err, game) {
    if (err) {
      return next(err);
    }

    res.json(game);
  });
});

// GET /games_id
router.get('/games/:_id', function(req, res, next) {

  var _id = req.params._id;

  console.log('_id: ' + _id);
  Game.findById({ _id: _id }, function(err, game) {
    if (err) {
      return next(err);
    }


    res.json(game);
  });
});

// PUT /games/_id
router.put('/games/:_id', function(req, res, next) {
  var _id = req.params._id;

  Game.update({ _id: _id }, req.body, function(err, game) {
    if (err) {
      return next(err);
    }
    
    res.json(game);
  });
});

// make public
module.exports = router;

