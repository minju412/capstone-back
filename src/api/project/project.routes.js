const express = require("express");
const authJwt = require('../../jwt/authJWT');
const router = express.Router();

const projectController = require("./project.controller");

let routes = (app) => {
    router.post("/create", authJwt, projectController.createProject);
    router.patch("/:projectId", authJwt, projectController.patchProject); // PATCH project/1
    router.delete("/:projectId", authJwt, projectController.deleteProject); // DELETE project/1
    router.post("/:projectId/keyword", authJwt, projectController.createKeyword); // POST project/1/keyword : 키워드 추가

    app.use("/project/", router);
};

module.exports = routes;