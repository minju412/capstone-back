const express = require("express");
const {isLoggedIn} = require('../../middlewares/authCheck'); // 로그인 한 사람만 결과를 볼 수 있도록
const router = express.Router();

const resultsController = require("./results.controller");

let routes = (app) => {
    router.get("/results", resultsController.getResults);
    router.get("/count", resultsController.count);

    app.use("/api/", router);
};

module.exports = routes;