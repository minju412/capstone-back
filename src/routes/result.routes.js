const express = require("express");
const router = express.Router();

const csvController = require("../controllers/csv/csv.controller");
const resultsController = require("../controllers/results/results.controller");
const upload = require("../middlewares/upload");

const{ Results } = require('../models/result.model'); /////

let routes = (app) => {
    router.get("/results", resultsController.getResults);
    router.get("/count", resultsController.count);

    router.get("/download", csvController.download);
    router.post("/upload", upload.single("file"), csvController.upload);

    app.use("/api/", router);
};

module.exports = routes;