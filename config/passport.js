const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt-nodejs');
const User = require('../models/user');

module.exports = (passport) => {
    /* ---------------------------------------------------------------------------- */
    // passport session set up
    // required for presistent login session

    // used to serialize the user for the session
    passport.serializeUser((user, done) => { done(null, user); });

    // used to deserialize user
    passport.deserializeUser((user, done) => { done(null, user); });

    /* ---------------------------------------------------------------------------- */
    // local register
    passport.use('local-register', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
    }, (req, username, password, done) => {
        console.log('passport - register');
        User.findOne({ username: username })
            .then(user => {
                // create new user
                if (!user) {
                    const newUser = new User({ username, password });
                    // hash password before sending to db
                    newUser.password = bcrypt.hashSync(password, null, null);
                    newUser.save()
                        .then(user => {
                            return done(null, user);
                        })
                        .catch(e => {
                            return done(null, false, { message: 'error saving user' });
                        });
                } else {
                    return done(null, false, { message: 'username taken' });
                }
            })
            .catch(e => {
                return done(null, false, { message: 'error finding user' });
            });
    }));

    /* ---------------------------------------------------------------------------- */
    // local login
    passport.use('local-login', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
    }, (req, username, password, done) => {
        User.findOne({ username: username })
            .then(user => {
                if (!user) {
                    return done(null, false, { message: 'no user found' });
                }
                if (!bcrypt.compareSync(password, user.password)) {
                    return done(null, false, { message: 'wrong passworc' });
                }
                return done(null, user);
            });
    }));
}
