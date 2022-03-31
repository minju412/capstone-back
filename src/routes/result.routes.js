const express = require("express");
const router = express.Router();
const csvController = require("../controllers/results/csv.controller");
const upload = require("../middlewares/upload");
let routes = (app) => {
    router.post("/upload", upload.single("file"), csvController.upload);
    router.get("/results", csvController.getResults);
    app.use("/api/csv", router);
};
module.exports = routes;