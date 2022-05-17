const express = require("express");
const authJwt = require('../../jwt/authJWT');
const router = express.Router();

const projectController = require("./project.controller");

let routes = (app) => {
    router.get("/list", authJwt, projectController.viewProjectList); // 프로젝트 목록 확인
    router.post("/create", authJwt, projectController.createProject); // 프로젝트 생성
    router.patch("/:projectId", authJwt, projectController.patchProject); // PATCH project/1 : 프로젝트 이름,description 수정
    router.post("/:projectId/setting", authJwt, projectController.setProject); // POST project/1/setting : 타겟도메인,모니터링Url,키워드 설정
    router.delete("/:projectId", authJwt, projectController.deleteProject); // DELETE project/1 : 프로젝트 삭제

    app.use("/project/", router);
};

module.exports = routes;