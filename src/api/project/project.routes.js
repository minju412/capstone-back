const express = require("express");
const authJwt = require('../../jwt/authJWT');
const router = express.Router();

const projectController = require("./project.controller");

let routes = (app) => {
    router.get("/list", authJwt, projectController.viewProjectList); // 프로젝트 목록 확인

    router.post("/create", authJwt, projectController.createProject); // 프로젝트 생성
    router.delete("/:projectId", authJwt, projectController.deleteProject); // DELETE project/1 : 프로젝트 삭제
    router.patch("/:projectId", authJwt, projectController.patchProject); // PATCH project/1 : 프로젝트 이름,타겟도메인,설명 수정

    // router.post("/:projectId/setting", authJwt, projectController.setProject); // POST project/1/setting : 타겟도메인,모니터링Url 설정

    router.post("/:projectId/keyword", authJwt, projectController.createKeyword); // POST project/1/keyword : 키워드 추가
    router.delete("/:projectId/keyword", authJwt, projectController.deleteKeyword); // DELETE project/1/keyword : 키워드 삭제

    router.post("/:projectId/url", authJwt, projectController.createUrl); // POST project/1/url : 모니터링Url 추가
    router.delete("/:projectId/url", authJwt, projectController.deleteUrl); // DELETE project/1/url : 모니터링Url 삭제


    app.use("/project/", router);
};

module.exports = routes;