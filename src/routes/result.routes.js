const express = require("express");
const router = express.Router();

// const csvController = require("../controllers/csv.controller");
const resultsController = require("../controllers/results.controller");
// const upload = require("../middlewares/upload");

let routes = (app) => {
    router.get("/results", resultsController.getResults);
    router.get("/count", resultsController.count);
    //
    // router.get("/download", csvController.download);
    // router.post("/upload", upload.single("file"), csvController.upload);

    app.use("/api/", router);
};

module.exports = routes;