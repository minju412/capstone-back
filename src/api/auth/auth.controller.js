require('dotenv').config();
const env = process.env;

const db = require("../../models");
const User = db.users;

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// 사용자 정보 받아오기
// const userInfo = (req, res) => {
//     res.json({
//         id: req.user.id,
//         userName: req.user.userName,
//         userEmail: req.user.userEmail,
//         realTimeStatus: req.user.realTimeStatus,
//         realTimeResult: req.user.realTimeResult,
//     });
// };

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

// 로그인
const login = (req, res) => {
    // email로 회원 찾기
    User.findOne({
        where : {
            userEmail: req.body.userEmail
        }
    })
        .then(user => {
            if(!user){
                return res.status(400).send('해당하는 회원이 존재하지 않습니다.');
            }

            // 패스워드 확인
            bcrypt.compare(req.body.userPw, user.userPw)
                .then(isMatch => {
                    if(isMatch) {
                        // 회원 비밀번호가 일치할 때
                        // JWT PAYLOAD 생성
                        const payload = {
                            id: user.id,
                            userName: user.userName
                        };

                        // JWT 토큰 생성
                        // 1시간 동안 유효
                        jwt.sign(payload, env.JWT_SECRET_KEY, { expiresIn: 3600 }, (err, token) => {
                            res.json({
                                success: true,
                                // token: token
                                token: 'Bearer ' + token
                            })
                        });
                    } else {
                        return res.status(400).send('패스워드가 일치하지 않습니다.');
                    }
                });
        })
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
        res.status(201).send('회원가입 성공');
    } catch(error){
        console.log(error);
        res.status(500).send({
            message: "회원가입 실패",
        });
        // next(error);
    }
};

// // 로그인
// const login = (req, res, next) => {
//     passport.authenticate('local', (err, user, info) => {
//         if(err){ // 서버 에러
//             console.error(err);
//             return next(err);
//         }
//         if(info){ // 클라이언트 에러
//             return res.status(401).send(info.reason);
//         }
//         return req.login(user, async(loginErr) => { // 패스포트 로그인
//             if(loginErr){
//                 console.error(loginErr);
//                 return next(loginErr);
//             }
//             const userWithoutPw = await User.findOne({
//                 where: {id: user.id},
//                 attributes: {
//                     exclude: ['userPw'] // 보안상 패스워드는 제외하고 보내기
//                 },
//             })
//             // 내부적으로 쿠키 전송 ( res.setHeader('Cookie', 'csdjf...'); )
//             return res.status(200).json(userWithoutPw); // 사용자 정보를 프론트로 넘김
//         });
//     })(req, res, next); // passport.authenticate 미들웨어 확장
// };
//
// // 로그아웃
// const logout = (req, res) => {
//     req.logout();
//     req.session.destroy;
//     res.send('로그아웃 성공');
//     // res.redirect("/");
// };

// 권한 확인 (토큰으로 인증 받기)
const check = async (req, res, next) => {
    try {
        res.json({result: true});
    } catch (error) {
        console.error(error);
        next(error);
    }
};

module.exports = {
    userInfo,
    signup,
    login,
    // logout,
    check,
};