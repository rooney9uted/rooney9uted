var express = require('express');
var router = express.Router();

var User = require('../models/user.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { errMsg : 'Express' });
});

router.post("/",function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  var loginUser = new User({
    username : username,
    userpwd : password
  });
  loginUser.userInfo(function(err,result){
    if(err){
      res.render('index', {errMsg: err });
      return;
    }
    if(result == ''){
      res.render('index', {errMsg: '�û�������' });
      return;
    }
    else{
      
      if(result[0]['userpwd'] == password){
        var user = {'username':username};
        req.session.user = user;
        res.redirect('/main');
      }
      else{
        res.render('index', {errMsg: '��������' });
      }
    }
  });
});


module.exports = router;
