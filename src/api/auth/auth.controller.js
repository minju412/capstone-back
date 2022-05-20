const db = require("../../models");
const User = db.users;
const bcrypt = require('bcrypt');

const jwt_util = require('../../jwt/jwt-util');
const { sign, verify, refreshVerify } = require('../../jwt/jwt-util');
const jwt = require('jsonwebtoken');
const redisClient = require('../../jwt/redis')

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

// 로그인
const login = (req, res) => {
    // email로 회원 찾기
    User.findOne({
        where: {
            userEmail: req.body.userEmail
        }
    })
        .then(user => {
            if (!user) {
                return res.status(400).send('해당하는 회원이 존재하지 않습니다.');
            }

            // 패스워드 확인
            bcrypt.compare(req.body.userPw, user.userPw)
                .then(isMatch => {
                    if (isMatch) {
                        // 회원 비밀번호가 일치할 때
                        // access token과 refresh token을 발급한다.
                        const accessToken = jwt_util.sign(user);
                        const refreshToken = jwt_util.refresh();

                        // 발급한 refresh token을 redis에 key를 user의 id로 하여 저장한다.
                        redisClient.set(user.id, refreshToken);

                        res.status(200).send({ // client에게 토큰 모두를 반환한다.
                            ok: true,
                            data: {
                                accessToken,
                                refreshToken,
                            },
                        });

                    } else {
                        res.status(401).send({
                            ok: false,
                            message: '패스워드가 일치하지 않습니다.',
                        });
                    }
                });
        })
};

// access token 재발급 (클라이언트는 access token과 refresh token을 둘 다 헤더에 담아서 요청)
const refresh = async (req, res) => {
    // access token과 refresh token의 존재 유무를 체크한다.
    console.log(req.headers.authorization)
    if (req.headers.authorization && req.headers.refresh) {
        const authToken = req.headers.authorization;
        const refreshToken = req.headers.refresh;

        // access token 검증 -> expired여야 함.
        const authResult = verify(authToken);

        // access token 디코딩하여 user의 정보를 가져온다.
        const decoded = jwt.decode(authToken);

        // 디코딩 결과가 없으면 권한이 없음을 응답.
        if (decoded === null) {
            res.status(401).send({
                ok: false,
                message: 'No authorized!',
            });
        }

        // access token의 decoding 된 값에서 유저의 id를 가져와 refresh token을 검증한다.
        let user = null;
        try {
            user = User.findOne({
                where : {
                    id: decoded.id,
                }
            })
        } catch (err) {
            res.status(401).send({
                ok: false,
                message: err.message,
            });
        }

        const refreshResult = refreshVerify(refreshToken, decoded.id);

        // 재발급을 위해서는 access token이 만료되어 있어야함.
        if (authResult.ok === false && authResult.message === 'jwt expired') {
            // 1. access token이 만료되고, refresh token도 만료 된 경우 => 새로 로그인해야합니다.
            if (refreshResult.ok === false) {
                res.status(401).send({
                    ok: false,
                    message: 'No authorized!',
                });
            } else {
                // 2. access token이 만료되고, refresh token은 만료되지 않은 경우 => 새로운 access token을 발급
                const newAccessToken = sign(user);

                res.status(200).send({ // 새로 발급한 access token과 원래 있던 refresh token 모두 클라이언트에게 반환.
                    ok: true,
                    data: {
                        accessToken: newAccessToken,
                        refreshToken,
                    },
                });
            }
        } else {
            // 3. access token이 만료되지 않은경우 => refresh 할 필요가 없음.
            res.status(400).send({
                ok: false,
                message: 'Access token is not expired!',
            });
        }
    } else { // access token 또는 refresh token이 헤더에 없는 경우
        res.status(400).send({
            ok: false,
            message: 'Access token and refresh token are need for refresh!',
        });
    }
};

// 사용자 정보 받아오기
const userInfo = async (req, res, next) => {
    try {
        if (req.id) {
            const userWithoutPw = await User.findOne({
                where: {id: req.id},
                attributes: {
                    exclude: ['userPw']
                },
                include: [{
                    model: db.projects, // 사용자가 생성한 프로젝트를 가져오기
                    attributes: ['id'],
                }]
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

// 유효한 사용자인지 확인 (토큰 이용)
const confirm = (req, res)=>{
    res.json({userId: req.id,userName: req.userName});
}

module.exports = {
    signup,
    login,
    refresh,
    userInfo,
    confirm,
};