const express = require("express");
const authJwt = require('../../jwt/authJWT');
const router = express.Router();

const searchController = require("./search.controller");

let routes = (app) => {
    router.post("/", authJwt, searchController.createNewTask); // 새로운 분석 작업을 생성하기
    router.get("/", authJwt, searchController.getTaskResult); // 분석 결과를 받아오기

    app.use("/analysis/", router);
};

module.exports = routes;