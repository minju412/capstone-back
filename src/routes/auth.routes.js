const express = require("express");
const router = express.Router();

const userController = require("../controllers/auth.controller");

let routes = (app) => {
    router.post("/signup", userController.signup); // POST /auth/signup
    router.post("/signin", userController.signin); // POST /auth/signin

    app.use("/auth/", router);
};

module.exports = routes;