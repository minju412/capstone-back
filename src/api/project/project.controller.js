const db = require("../../models");
const Project = db.projects;
const Keyword = db.keywords;
const Url = db.monitoringUrls;

// 생성한 프로젝트 목록 확인
const viewProjectList = async (req, res) => {
    // pagination
    const paged = req.query.paged;
    const _limit = 10;
    const _offset = (paged-1) * _limit; // 1페이지부터 시작

    try{
        const project_list = await Project.findAll({
            where: {
                user_id: req.id
            },
            limit:_limit,
            offset:_offset
        })
        res.status(200).json(project_list);
    } catch(error){
        console.log(error);
        res.status(500).send({
            message: "프로젝트 리스트 조회 실패",
        });
    }
};

// 프로젝트 생성
const createProject = async (req, res) => {
    try{
        let project = await Project.findOne({
            where: {
                projectName: req.body.projectName,
                user_id: req.id
            }
        });
        if (!project){
            project = await Project.create({
                projectName: req.body.projectName,
                description: req.body.description,
                user_id: req.id, // 해당 프로젝트를 생성한 사용자 id
            });

            // await project.addUser(req.id);
            res.status(200).json({ ProjectId: project.id, UserId: req.id });
        }
        else{
            res.status(403).send({
                message: "프로젝트 이름 중복",
            });
        }
    } catch(error){
        console.log(error);
        res.status(500).send({
            message: "프로젝트 생성 실패",
        });
    }
};

// 프로젝트 이름,description 수정
const patchProject = async (req, res) => {
    try{
        const project = await Project.findOne({
            where: {
                id: req.params.projectId,
                user_id: req.id
            }
        });
        if(project){
            await Project.update(
                {
                    projectName: req.body.projectName,
                    description: req.body.description
                },
                { where: { id: req.params.projectId }}
            );
            res.status(200).send('프로젝트 수정 성공');
        }
       else{
            res.status(403).send({
                message: "존재하지 않는 프로젝트입니다.",
            });
        }
    } catch(error){
        console.log(error);
        res.status(500).send({
            message: "프로젝트 수정 실패",
       });
    }
};

// 프로젝트 설정 (타겟도메인, 모니터링 url, 키워드)
const setProject = async (req, res) => {
    try{
        const project = await Project.findOne({
            where: {
                id: req.params.projectId,
                user_id: req.id
            }
        });
        if(project) {
            // 타겟도메인 설정
            await Project.update(
                {
                    targetDomain: req.body.targetDomain,
                },
                { where: { id: req.params.projectId }}
            );

            // 키워드 설정
            let keyword = await Keyword.findOne({
                where: {
                    keyword: req.body.keyword,
                },
            });
            if (!keyword){
                keyword = await Keyword.create({
                    keyword: req.body.keyword,
                });
            }
            await project.addKeyword(keyword.id); // Add 테이블(through table)의 project_id와 keyword_id에 값을 삽입한다.

            // 모니터링 url 설정
            let url = await Url.findOne({
                where: {
                    url: req.body.url,
                },
            });
            if (!url){
                url = await Url.create({
                    url: req.body.url,
                });
            }
            await project.addMonitoringUrl(url.id); // MonitoringUrl 테이블의 project_id(FK)에 값을 삽입한다.

            res.status(200).json({ ProjectId: parseInt(req.params.projectId, 10) });
        } else{
            res.status(403).send({
                message: "존재하지 않는 프로젝트입니다.",
            });
        }
    } catch(error){
        console.log(error);
        res.status(500).send({
            message: "프로젝트 설정 실패",
        });
    }
};


// 프로젝트 제거
const deleteProject = async (req, res) => {
    try{
        const project = await Project.findOne({
            where: {
                id: req.params.projectId,
                user_id: req.id
            }
        });
        if(project) {
            await Project.destroy({
                where: { id: req.params.projectId }
            });
            res.json({ ProjectId: parseInt(req.params.projectId, 10) }); // params는 문자열!
        }
        else{
            res.status(403).send({
                message: "존재하지 않는 프로젝트입니다.",
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
    viewProjectList,
    createProject,
    patchProject,
    deleteProject,
    setProject,
};