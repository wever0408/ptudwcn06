const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const passport = require('passport')
const userDB = require('../models/user')


var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'xuantam0304'

passport.use(new JwtStrategy(opts, (jwt_payload, cb) => {
    return userDB.findById(jwt_payload).then(user => {
        return cb(null, user);
    })
        .catch(err => {
            return cb(err);
        })

}));
