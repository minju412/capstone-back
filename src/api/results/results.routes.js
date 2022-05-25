const express = require("express");
const authJwt = require('../../jwt/authJWT');
const router = express.Router();

const resultsController = require("./results.controller");

let routes = (app) => {
    router.get("/", authJwt, resultsController.getResults);
    router.get("/number/category", authJwt, resultsController.categoryCount);
    router.get("/number/language", authJwt, resultsController.languageCount);

    app.use("/results/", router);
};

module.exports = routes;