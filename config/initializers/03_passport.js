var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var mongoose = require('mongoose');
var config = require('../config');
var AccountModel = require('../../app/models/accountModel');

/**
 * Local login strategy
 * git http://passportjs.org/guide/configure/
 */
passport.use(new LocalStrategy(
    function(username, password, done) {
        /*
 AccountModel
  */
    }));
/**
 * Twitter login strategy
 * git https://github.com/jaredhanson/passport-instagram
 */
passport.use(new TwitterStrategy({
        consumerKey: config.publishers.Twitter.consumerKey,
        consumerSecret: config.publishers.Twitter.consumerSecret,
        callbackURL: config.publishers.Twitter.callbackURL
    },
    function(token, tokenSecret, profile, done) {
        /*
 AccountModel
  */
    }));
/**
 * Facebook login strategy
 * git https://github.com/jaredhanson/passport-facebook
 */
//Facebook reach is calculated in the publishers_controller on successfull callback.
passport.use(new FacebookStrategy({
        clientID: config.publishers.Facebook.clientID,
        clientSecret: config.publishers.Facebook.clientSecret,
        callbackURL: config.publishers.Facebook.callbackURL,
    },
    function(accessToken, refreshToken, profile, done) {

    }));


/**
 * Google login strategy
 * https://github.com/jaredhanson/passport-google-oauth
 */
passport.use(new GoogleStrategy({
        clientID: config.publishers.Google.clientID,
        clientSecret: config.publishers.Google.clientSecret,
        callbackURL: config.publishers.Google.callbackURL
    },
    function(token, refreshToken, profile, done) {





AccountModel.findOne({'gid': profile.id},function(e,r){
if(r == null || r.length === 0)
{
   var user = new AccountModel();
   user.gid = profile.id;
   user.displayName = profile.displayName;
user.familyName = profile.familyName;
user.givenName = profile.givenName;
user.email.push(profile.emails);
user.refreshToken = refreshToken;
user.save(function(ee,rr){
    console.log('USER SAVE')
    console.log(rr);
    console.log(ee);
        done(null,rr)

})
}else{
        console.log('USER FOUND')

    done(null,r)
}

})
    }))




/**
 * Passport session serialize
 */
passport.serializeUser(function(user, done) {
    console.log(user)
    done(null, user._id);
});

/**
 * Passport session deserialize
 */
passport.deserializeUser(function(id, done) {
    AccountModel.findById(id, function(err, user) {
        done(err, user);
    });
});

module.exports = passport;