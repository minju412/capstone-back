const express = require("express");
const authJwt = require('../../jwt/authJWT');
const router = express.Router();

const userController = require("./auth.controller");

let routes = (app) => {
    router.get('/', authJwt, userController.userInfo); // 사용자 정보
    router.get('/refresh', userController.refresh); // access token 재발급
    router.post("/signup", userController.signup); // 회원가입
    router.post("/login", userController.login); // 로그인
    router.get('/confirm', authJwt,userController.confirm); // 유효한 사용자인지 확인

    app.use("/auth/", router);
};

module.exports = routes;