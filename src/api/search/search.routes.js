const express = require("express");
// const {verifyToken} = require('../../middlewares/verifyToken')
const authJwt = require('../../jwt/authJWT');
const router = express.Router();

const searchController = require("./search.controller");

let routes = (app) => {
    router.post("/search/", authJwt, searchController.createNewTask); // 사용자가 입력한 타겟도메인 받아오기
    router.get("/search/", authJwt, searchController.getTaskResult);
    app.use("/api/", router);
};

module.exports = routes;