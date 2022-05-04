const db = require("../../models");
const User = db.users;

const bcrypt = require('bcrypt');
const passport = require('passport');

// 내 로그인 정보 불러오기
const userInfo = async (req, res, next) => {
    try {
        if (req.user) {
            const userWithoutPw = await User.findOne({
                where: {id: req.user.id},
                attributes: {
                    exclude: ['userPw']
                },
            })
            res.status(200).json(userWithoutPw);
        } else {
            res.status(200).json(null);
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
};

// 회원가입
const signup = async (req, res) => {
    try{
        const exUser = await User.findOne({
            where : {
                userEmail: req.body.userEmail
            }
        });
        if(exUser){
            return res.status(403).send('이미 사용중인 이메일입니다.');
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
        // next(error);
    }
};

// 로그인
const login = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if(err){ // 서버 에러
            console.error(err);
            return next(err);
        }
        if(info){ // 클라이언트 에러
            return res.status(401).send(info.reason);
        }
        return req.login(user, async(loginErr) => { // 패스포트 로그인
            if(loginErr){
                console.error(loginErr);
                return next(loginErr);
            }
            const userWithoutPw = await User.findOne({
                where: {id: user.id},
                attributes: {
                    exclude: ['userPw'] // 보안상 패스워드는 제외하고 보내기
                },
            })
            // 내부적으로 쿠키 전송 ( res.setHeader('Cookie', 'csdjf...'); )
            return res.status(200).json(userWithoutPw); // 사용자 정보를 프론트로 넘김
        });
    })(req, res, next); // passport.authenticate 미들웨어 확장
};

// 로그아웃
const logout = (req, res) => {
    req.logout();
    req.session.destroy;
    res.send('ok');
    // res.redirect("/");
};

module.exports = {
    userInfo,
    signup,
    login,
    logout,
};