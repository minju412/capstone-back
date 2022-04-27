const passport = require('passport');
const local = require('./local');
const { User } = require('../models/user.model')

module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, user.id); // user.id만 세션 객체에 넣음
    });
    passport.deserializeUser(async (id, done) => {
        try{
            const user = await User.findOne({
                where: { id }
            });
            done(null, user);
        } catch(error){
            console.error(error);
            done(error); // passport는 done으로
        }
    });
    local();
};