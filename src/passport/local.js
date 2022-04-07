const passport = require('passport');
const { Strategy : LocalStrategy } = require('passport-local');
const db = require("../models");
const User = db.users;
const bcrypt = require('bcrypt');

module.exports = () => {
    passport.use(new LocalStrategy ({
        usernameField: 'userEmail', // id
        passwordField: 'userPw', // password
    }, async (userEmail, userPw, done) => {
        try{
            const user = await User.findOne({
                where : { userEmail }
            });
            if(!user){
                return done(null, false, {reason: 'Email does not exist.'});
            }
            const result = bcrypt.compare(userPw, user.userPw);
            if (result){ // 이메일 있고, 비밀번호 일치하면 성공
                return done(null, user);
            }
            return done(null, false, {reason: 'Wrong password.'});
        } catch(error){
            console.log(error);
            return done(error);
        }
    }));
};