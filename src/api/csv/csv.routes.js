const express = require("express");
const router = express.Router();

const csvController = require("./csv.controller");
const upload = require("../../middlewares/uploadCsv");

let routes = (app) => {
    router.get("/", csvController.download); // csv 파일 다운로드
    router.post("/", upload.single("file"), csvController.upload); // csv 파일 업로드

    app.use("/csv/", router);
};

module.exports = routes;