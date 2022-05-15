const db = require("../../models");
const Project = db.projects;

// 프로젝트를 생성 -> db에 이름,설명,타겟도메인 추가
const createProject = async (req, res) => {
    try{
        const project = await Project.create({
            projectName: req.body.projectName,
            targetDomain: req.body.targetDomain,
            description: req.body.description,
            user_id: req.id, // 해당 프로젝트를 생성한 사용자 id
        });
        // await project.addUser(req.id);
        res.json({ ProjectId: project.id, UserId: req.id });
    } catch(error){
        console.log(error);
        res.status(500).send({
            message: "프로젝트 생성 실패",
        });
    }
};

module.exports = {
    createProject,
};