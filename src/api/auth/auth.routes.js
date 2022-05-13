const express = require("express");
// const {verifyToken} = require('../../middlewares/verifyToken')
const authJwt = require('../../jwt/authJWT');
const refresh = require('../../jwt/refresh');
const router = express.Router();

const userController = require("./auth.controller");

let routes = (app) => {
    router.get('/', authJwt, userController.userInfo); // GET /auth : 사용자 정보
    router.get('/refresh', refresh);
    router.post("/signup", userController.signup); // POST /auth/signup : 회원가입
    router.post("/login", userController.login); // POST /auth/login : 로그인
    router.post("/logout",userController.logout); // POST /auth/logout : 로그아웃
    router.get('/confirm', authJwt,userController.confirm); // 유효한 사용자인지 확인

    // router.get('/', verifyToken, userController.userInfo); // GET /auth : 사용자 정보
    // router.get('/confirm', verifyToken,userController.confirm); // 유효한 사용자인지 확인

    app.use("/auth/", router);
};

module.exports = routes;