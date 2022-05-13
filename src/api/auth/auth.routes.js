const express = require("express");
const {verifyToken} = require('../../middlewares/verifyToken')
const router = express.Router();

const userController = require("./auth.controller");

let routes = (app) => {
    router.get('/', verifyToken, userController.userInfo); // GET /auth : 사용자 정보
    router.post("/signup", userController.signup); // POST /auth/signup : 회원가입
    router.post("/login", userController.login); // POST /auth/login : 로그인
    // router.get('/confirm', verifyToken,userController.confirm); // 유효한 사용자인지 확인
    router.post("/logout",userController.logout); // POST /auth/logout : 로그아웃

    app.use("/auth/", router);
};

module.exports = routes;