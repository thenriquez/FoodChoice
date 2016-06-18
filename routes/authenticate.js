var express = require('express');
var router = express.Router();

var User = require('../models/user.js');
var passport = require('../config/passport.js');


// /Register Routes

router.post('/register', function(req, res) {

  var newUser = new User(req.body);

  newUser.save(function(err, doc) {
    if(err) {
      res.send({state: 'failure', user: null, message: err});
    } else {
      res.send({state: 'success', user: doc.username, message: "User Created!"});
    }
  });
});


// /Login Routes
router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      res.send({state: 'failure', user: null, message: err});
    }
    if (!user) {
      res.send({state: 'failure', message: "Invalid Login Credentials" });
    }
    req.logIn(user, function(err) {
      if (err) {
        return next({state: 'failure', user: null, message: err});
      } else {
        res.send({state: 'success', user: req.body.username});
      }
    });
  })(req,res,next);
});

router.get('/logout', function(req, res){
    req.logout();
    req.session.destroy();
    res.redirect("/login");
});

module.exports = router;
