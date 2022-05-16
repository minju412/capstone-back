const db = require("../../models");
const Project = db.projects;

// 프로젝트 생성
const createProject = async (req, res) => {
    try{
        const project = await Project.create({
            projectName: req.body.projectName,
            targetDomain: req.body.targetDomain,
            description: req.body.description,
            user_id: req.id, // 해당 프로젝트를 생성한 사용자 id
        });
        // await project.addUser(req.id);
        res.status(200).json({ ProjectId: project.id, UserId: req.id });
    } catch(error){
        console.log(error);
        res.status(500).send({
            message: "프로젝트 생성 실패",
        });
    }
};

// 프로젝트 수정
const patchProject = async (req, res) => {
    try{
        await Project.update(
            {
            projectName: req.body.projectName,
            targetDomain: req.body.targetDomain,
            description: req.body.description
            },
            {
                where: {
                id: req.params.projectId,
                user_id: req.id
                }
            }
        );
        res.status(200).send('프로젝트 수정 성공');
    } catch(error){
        console.log(error);
        res.status(500).send({
            message: "프로젝트 수정 실패",
       });
    }
};

// 프로젝트 제거
const deleteProject = async (req, res) => {
    try{
        const project = await Project.destroy({
            where: {
                id: req.params.projectId,
                user_id: req.id
            }
        });
        if (project){
            res.json({ ProjectId: parseInt(req.params.projectId, 10) }); // params는 문자열!
        }
        else{
            res.status(400).send({
                message: "프로젝트가 존재하지 않거나 권한이 없습니다.",
            });
        }
    } catch(error){
        console.log(error);
        res.status(500).send({
            message: "프로젝트 제거 실패",
        });
    }
};

module.exports = {
    createProject,
    patchProject,
    deleteProject,
};