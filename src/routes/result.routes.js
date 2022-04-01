const express = require("express");
const router = express.Router();

const csvController = require("../controllers/results/csv.controller");
const upload = require("../middlewares/upload");

const{ Results } = require('../models/result.model'); /////

let routes = (app) => {
    router.get("/results", csvController.getResults);
    router.get("/download", csvController.download);
    router.post("/upload", upload.single("file"), csvController.upload);

    // router.post('/create', async (req, res, next) => {
    //     const resultbody = req.body; // 클라이언트로 부터 result 정보를 받는다.
    //     Results.create({
    //         url: resultbody.url,
    //         title: resultbody.title,
    //         language: resultbody.language,
    //         category: resultbody.category,
    //         site_tracking_codes: resultbody.site_tracking_codes,
    //         personal_information: resultbody.personal_information,
    //         others: resultbody.others,
    //         reference_url: resultbody.reference_url
    //     })
    //         .then((result) => {
    //             console.log("저장 성공: ", result);
    //             return res.send({ success: true, result });
    //         })
    //         .catch((err) => {
    //             console.log("저장 Error: ", err);
    //             return res.send({ success: false });
    //         });
    // })

    app.use("/api/", router);
};
module.exports = routes;