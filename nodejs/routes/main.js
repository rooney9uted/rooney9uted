/**
 * Created by lizhihui on 2017/8/24.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    var user = req.session.user;
    res.render('main', { username:user.username});
});
module.exports = router;