var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var user = require('./db').user;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/user/', function(req, res, next) {
  res.render('./user/aa', { title: 'Express' });
});

module.exports = router;
