const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');
const env = require('./enviroment');

passport.use(new googleStrategy({

        clientID: env.google_client_ID,
        clientSecret: env.google_clientSecret,
        callbackURL: env.google_callbackURL,
    },

    function(accessToken,refreshToken,profile,done) {

        User.findOne({email : profile.emails[0].value}).exec().then((user,err) => {

            if(err){
                console.log('Error in google strategy',err);
                return;
            }
            console.log(accessToken);
            console.log(profile);

            if(user){
                return done(null,user);
            }else{
                User.create({
                    name : profile.displayName,
                    email : profile.emails[0].value,
                    password : crypto.randomBytes(20).toString('hex')
                }).then((result,err) => {
                    if(err){
                        console.log('Error in creating',err);
                        return;
                    }
                    done(null,result);
                });
            }
        })
    }

));