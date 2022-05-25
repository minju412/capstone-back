const express = require("express");
const router = express.Router();

const resultsController = require("./results.controller");

let routes = (app) => {
    router.get("/", resultsController.getResults);
    router.get("/number/category", resultsController.categoryCount);
    router.get("/number/language", resultsController.languageCount);

    app.use("/results/", router);
};

module.exports = routes;