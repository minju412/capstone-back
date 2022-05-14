require('dotenv').config();
const env = process.env;

const db = require("../../models");
const User = db.users;

const bcrypt = require('bcrypt');
const jwt = require('../../jwt/jwt-utils')
const redisClient = require('../../jwt/redis')
// const jwt = require('jsonwebtoken');

// 사용자 정보 받아오기
const userInfo = async (req, res, next) => {
    try {
        if (req.id) {
            const userWithoutPw = await User.findOne({
                where: {id: req.id},
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
                        // access token과 refresh token을 발급한다.
                        const accessToken = jwt.sign(user);
                        const refreshToken = jwt.refresh();

                        // 발급한 refresh token을 redis에 key를 user의 id로 하여 저장한다.
                        redisClient.set(user.id, refreshToken);

                        res.status(200).send({ // client에게 토큰 모두를 반환한다.
                            ok: true,
                            data: {
                                accessToken,
                                refreshToken,
                            },
                        });

                        // // JWT PAYLOAD 생성
                        // const payload = {
                        //     id: user.id,
                        //     userName: user.userName
                        // };
                        // // JWT 토큰 생성
                        // // 1시간 동안 유효
                        // jwt.sign(payload, env.JWT_SECRET_KEY, { expiresIn: 3600 }, (err, token) => {
                        //     res.json({
                        //         success: true,
                        //         // token: token
                        //         token: 'Bearer ' + token
                        //     })
                        // });

                    } else{
                        res.status(401).send({
                            ok: false,
                            message: '패스워드가 일치하지 않습니다.',
                        });
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
            userPw: hashedPw,
            realTimeStatus: 'READY'
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

// 유효한 사용자인지 확인 (토큰 이용)
const confirm = (req, res, next)=>{
    res.json({userId: req.id,userName: req.userName});
}

module.exports = {
    userInfo,
    signup,
    login,
    confirm,
};