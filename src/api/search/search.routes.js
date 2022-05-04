const express = require("express");
const {isLoggedIn} = require('../auth/middlewares'); // 로그인 한 사람만 검색할 수 있도록
const router = express.Router();

const searchController = require("./search.controller");

let routes = (app) => {
    router.get("/search/domain", isLoggedIn, searchController.getDomain); // 로그인 한 사용자로부터 들어온 url 주소, 유저 id를 받아오는 엔드포인트

    app.use("/api/", router);
};

module.exports = routes;