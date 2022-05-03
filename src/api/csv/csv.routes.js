const express = require("express");
const router = express.Router();

const csvController = require("./csv.controller");
const upload = require("../../middlewares/upload");

let routes = (app) => {
    router.get("/download", csvController.download);
    router.post("/upload", upload.single("file"), csvController.upload);

    app.use("/api/", router);
};

module.exports = routes;