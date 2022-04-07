const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");

let routes = (app) => {
    router.post("/signup", userController.signup); // POST /user/signup
    router.post("/signin", userController.signin); // POST /user/signin

    app.use("/user/", router);
};

module.exports = routes;