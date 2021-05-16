/**
 * Created by lizhihui on 2017/8/24.
 */
var express = require('express');
var router = express.Router();
var User = require("../models/user.js");

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('register', {errMsg:""});
});


router.post('/aa',function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var newUser = new User({
        username : username,
        userpwd : password
    });
    
    newUser.userNum(newUser.username, function (err, results) {
        if (results != null && results[0]['num'] > 0) {
            err = '�û����Ѵ���';
        }

        if (err) {
            res.render('register', {errMsg: err });
            return;
        }
        newUser.userSave(function(err,result){
            if(err){
                res.render('register', {errMsg: err });
                return;
            }
            if(result.insertId > 0){
                res.locals.status = "success";
                res.render('register', {errMsg:'' });
            }
            else{
                res.render('register', {errMsg: err });
            }
        });
    });
});

module.exports = router;

