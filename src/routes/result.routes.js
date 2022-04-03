const express = require("express");
const router = express.Router();

const csvController = require("../controllers/results/csv.controller");
const upload = require("../middlewares/upload");

const{ Results } = require('../models/result.model'); /////

let routes = (app) => {
    router.get("/results", csvController.getResults);
    router.get("/download", csvController.download);
    router.post("/upload", upload.single("file"), csvController.upload);

    app.use("/api/", router);
};
module.exports = routes;