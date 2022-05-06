require('dotenv').config();
const env = process.env;
// const JwtStrategy = require('passport-jwt').Strategy;
// const ExtractJwt = require('passport-jwt').ExtractJwt;
const { ExtractJwt, Strategy: JwtStrategy } = require('passport-jwt');

const db = require("../models");
const User = db.users;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = env.JWT_SECRET_KEY,

module.exports = passport => {
    passport.use(new JwtStrategy(opts, (jwt_payload, done) =>{
        User.findOne( {id: jwt_payload.id} )
            .then(user => {
                if(user) {
                    return done(null, user);
                }
                return done(null, false);
            })
            .catch(err => console.log(err));
    }));
};