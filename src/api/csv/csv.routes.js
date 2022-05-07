const express = require("express");
const {isLoggedIn} = require('../../middlewares/authCheck'); // 로그인 한 사람만 허용
const router = express.Router();

const csvController = require("./csv.controller");
const upload = require("../../middlewares/uploadCsv");

let routes = (app) => {
    router.get("/download", csvController.download);
    router.post("/upload", upload.single("file"), csvController.upload);

    app.use("/api/", router);
};

module.exports = routes;