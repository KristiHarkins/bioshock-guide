var passport = require('passport'),
    userModel = require('../app/modules/models/UserModel'),
    conf = require('./conf'),
    TwitterStrategy = require('passport-twitter').Strategy,
    FacebookStrategy = require('passport-facebook').Strategy;

var passportModule = function(){

    var self = this;
    self.model = new userModel();

    passport.serializeUser(function(user, done){
        done(null, user);
    });

    passport.deserializeUser(function(user, done){
        done(null, user);
    });

    //twitter strategy
    passport.use(new TwitterStrategy({
        consumerKey: conf.twitterCredentials.key,
        consumerSecret: conf.twitterCredentials.secret,
        callbackURL: '/auth/twitter/callback'
    },
    function(token, tokenSecret, profile, done){
        //data profile
        var dataProfile = {
            provider_id : profile.id,
            provider    : profile.provider,
            name        : profile.displayName,
            photo       : profile.photos[0].value.replace('_normal','')
        }

        self.model.findOrCreate(dataProfile, done);
    }));

    //facebook strategy
    passport.use(new FacebookStrategy({
        clientID: conf.facebookCredentials.appId,
        clientSecret: conf.facebookCredentials.secret,
        callbackURL: "/auth/facebook/callback",
        profileFields : ['id', 'displayName', 'gender', 'profileUrl', 'photos']
    },
    function(accessToken, refreshToken, profile, done){

        //data profile
        var dataProfile = {
            provider_id : profile.id,
            provider    : profile.provider,
            name        : profile.displayName,
            photo       : 'http://graph.facebook.com/' + profile.id + '/picture?width=100&height=100'
        }

        self.model.findOrCreate(dataProfile, done);

    }));
};

module.exports = passportModule;