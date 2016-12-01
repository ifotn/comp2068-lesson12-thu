var express = require('express');
var router = express.Router();

// link to the Game model
var Game = require('../models/game');

// GET
router.get('/', function(req, res, next) {
  res.render('index');
});

// make public
module.exports = router;

