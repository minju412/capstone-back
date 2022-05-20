const express = require("express");
const router = express.Router();

const resultsController = require("./results.controller");

let routes = (app) => {
    router.get("/", resultsController.getResults);
    router.get("/number", resultsController.count);

    app.use("/results/", router);
};

module.exports = routes;