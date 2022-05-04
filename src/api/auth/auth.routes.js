const express = require("express");
const {isLoggedIn, isNotLoggedIn} = require('./middlewares');
const router = express.Router();

const userController = require("./auth.controller");

let routes = (app) => {
    router.post("/signup", isLoggedIn, userController.signup); // POST /auth/signup // 회원가입
    router.post("/signin", isNotLoggedIn, userController.signin); // POST /auth/signin // 로그인
    // router.post("/logout", isLoggedIn, userController.logout); // POST /auth/logout // 로그아웃

    app.use("/auth/", router);
};

module.exports = routes;