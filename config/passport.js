var passport = require('passport');
var passportLocal = require('passport-local').Strategy;
var User = require('../models/user.js');
var bcrypt = require('bcryptjs');

var FacebookStrategy = require('passport-facebook').Strategy;
var configAuth = require('./auth.js')

// passportlocal auth strategy
passport.use(new passportLocal(
  function(username, password, done) {
    User.findOne({ username: username }).then(function(user) {
      if(user){
        // if user exists then check password against hash
        bcrypt.compare(password, user.password, function(err, check) {
          if (check) {
            done(null, { id:user.id, username: username, activeAcc: user.activeAcc });
          } else{
            done(null, null);
          }
        });
      } else {
        done(null, null);
      }
    });
  }
));

// =========================================================================
// FACEBOOK ==========PASPPORT==============================================
// =========================================================================



passport.use(new FacebookStrategy({
  clientID: configAuth.facebookAuth.clientID,
  clientSecret: configAuth.facebookAuth.clientSecret,
  callbackURL: configAuth.facebookAuth.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function(){
      User.findOrCreate({ facebookId: profile.id }, function (err, user) {
        return done(err, user);
      });
    })

  }
));


passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findOne({ _id: id }).then(function(user) {
    done(null, { id: user.id, username: user.username});
  });
});



module.exports = passport;
