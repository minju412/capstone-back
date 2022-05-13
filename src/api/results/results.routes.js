const express = require("express");
const router = express.Router();

const resultsController = require("./results.controller");

let routes = (app) => {
    router.get("/results", resultsController.getResults);
    router.get("/count", resultsController.count);

    app.use("/api/", router);
};

module.exports = routes;