const express = require("express");
const authJwt = require('../../jwt/authJWT');
const router = express.Router();

const projectController = require("./project.controller");

let routes = (app) => {
    router.post("/create", authJwt, projectController.createProject);
    router.delete("/delete/:projectId", authJwt, projectController.deleteProject); // DELETE project/delete/1

    app.use("/project/", router);
};

module.exports = routes;