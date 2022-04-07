const db = require("../models");
const User = db.users;

const bcrypt = require('bcrypt');
const passport = require('passport');

// 회원가입
const signup = async (req, res) => {
    try{
        const exUser = await User.findOne({
            where : {
                userEmail: req.body.userEmail
            }
        });
        if(exUser){
            return res.status(403).send('This email is already in use.');
        }

        const hashedPw = await bcrypt.hash(req.body.userPw, 12);
        await User.create({
            userName: req.body.userName,
            userEmail: req.body.userEmail,
            userPw: hashedPw
        });
        // res.json();
        res.status(201).send('ok');
    } catch(error){
        console.log(error);
        res.status(500).send({
            message: "Could not sign up.",
        });
    }

};

// 로그인 (미들웨어 확장)
const signin = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if(err){ // 서버 에러
            console.error(err);
            return next(err);
        }
        if(info){ // 클라이언트 에러
            return res.status(401).send(info.reason);
        }
        return req.login(user, async(loginErr) => {
            if(loginErr){
                console.error(loginErr);
                return next(loginErr);
            }
            return res.status(200).json(user); // 사용자 정보를 프론트로 넘김
        });
    })(req, res, next);
};

module.exports = {
    signup,
    signin
};