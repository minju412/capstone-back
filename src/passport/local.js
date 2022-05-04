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
            // 로그인 시 이메일로 사용자를 찾기
            const user = await User.findOne({
                where : { userEmail }
            });
            if(!user){
                return done(null, false, {reason: 'Email does not exist.'});
            }
            // 존재하는 이메일이라면 비밀번호 비교
            const result = bcrypt.compare(userPw, user.userPw);
            if (result){
                return done(null, user); // 사용자 정보를 넘겨준다.
            }
            return done(null, false, {reason: 'Wrong password.'});
        } catch(error){
            console.log(error);
            return done(error);
        }
    }));
};