const express = require("express");
const authJwt = require('../../jwt/authJWT');
const router = express.Router();

const projectController = require("./project.controller");

let routes = (app) => {
    router.post("/create", authJwt, projectController.createProject);

    app.use("/project/", router);
};

module.exports = routes;