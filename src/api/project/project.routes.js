const express = require("express");
const router = express.Router();

const resultsController = require("./project.controller");

let routes = (app) => {


    app.use("/api/", router);
};

module.exports = routes;