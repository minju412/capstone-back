const express = require("express");
const {isLoggedIn, isNotLoggedIn} = require('../../middlewares/authCheck');
const router = express.Router();

const userController = require("./auth.controller");
const passport = require("passport");

let routes = (app) => {
    router.get('/', passport.authenticate('jwt', {session: false}), userController.userInfo); // GET /auth : 사용자 정보
    router.post("/signup", userController.signup); // POST /auth/signup : 회원가입
    router.post("/login", userController.login); // POST /auth/login : 로그인
    router.post('/check', passport.authenticate('jwt', { session: false }),userController.check); // 권한 확인
    // router.post("/logout", userController.logout); // POST /auth/logout : 로그아웃

    // router.get('/', isLoggedIn, userController.userInfo); // GET /auth : 사용자 정보
    // router.post("/signup", isNotLoggedIn, userController.signup); // POST /auth/signup : 회원가입
    // router.post("/login", isNotLoggedIn, userController.login); // POST /auth/login : 로그인
    // router.post("/logout", isLoggedIn, userController.logout); // POST /auth/logout : 로그아웃

    app.use("/auth/", router);
};

module.exports = routes;