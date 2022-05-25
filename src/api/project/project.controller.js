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

// 프로젝트 생성 (이름,타겟도메인,설명)
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
                targetDomain: req.body.targetDomain,
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

// 프로젝트 수정 (이름,타겟도메인,설명)
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
                    targetDomain: req.body.targetDomain,
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

// 키워드 추가
const createKeyword = async (req, res) => {
    try{
        const project = await Project.findOne({
            where: {
                id: req.params.projectId,
                user_id: req.id
            }
        });
        if(project) {
            let keyword = await Keyword.findOrCreate({
                where: {
                    keyword: req.body.keyword,
                },
            }); // findOrCreate() -> keyword는 [키워드, true] 형태 -> keyword[0].id를 사용

            await project.addKeyword(keyword[0].id); // Add 테이블(through table)의 project_id와 keyword_id 값을 삽입한다.
            res.status(200).json({ ProjectId: parseInt(req.params.projectId, 10) });
        } else{
            res.status(403).send({
                message: "존재하지 않는 프로젝트입니다.",
            });
        }
    } catch(error){
        console.log(error);
        res.status(500).send({
            message: "키워드 추가 실패",
        });
    }
};

// 키워드 삭제
const deleteKeyword = async (req, res) => {
    try{
        const project = await Project.findOne({
            where: {
                id: req.params.projectId,
                user_id: req.id
            }
        });
        if(project) {
            let keyword = await Keyword.findOne({
                where: {
                    keyword: req.body.keyword,
                },
            });
            if(keyword){
                await project.removeKeyword(keyword.id); // Add 테이블(through table)의 project_id와 keyword_id 값을 제거한다.
                res.status(200).json({ ProjectId: parseInt(req.params.projectId, 10) });
            } else{
                res.status(403).send({
                    message: "존재하지 않는 키워드입니다.",
                });
            }
        } else{
            res.status(403).send({
                message: "존재하지 않는 프로젝트입니다.",
            });
        }
    } catch(error){
        console.log(error);
        res.status(500).send({
            message: "키워드 삭제 실패",
        });
    }
};

// 모니터링 url 추가
const createUrl = async (req, res) => {
    try{
        const project = await Project.findOne({
            where: {
                id: req.params.projectId,
                user_id: req.id
            }
        });
        if(project) {
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
            message: "모니터링 url 추가 실패",
        });
    }
};

// 모니터링 url 수정
const patchUrl = async (req, res) => {
    try{
        const project = await Project.findOne({
            where: {
                id: req.params.projectId,
                user_id: req.id
            }
        });
        if(project) {
            let url = await Url.findOne({
                where: {
                    url: req.body.oldUrl,
                    project_id: req.params.projectId
                },
            });
            if (url){
                await Url.update(
                    {
                        url: req.body.newUrl,
                    },
                    { where: { id: url.id }}
                );
                res.status(200).send('모니터링 url 수정 성공');
            } else{
                res.status(403).send({
                    message: "존재하지 않는 url입니다.",
                });
            }
        } else{
            res.status(403).send({
                message: "존재하지 않는 프로젝트입니다.",
            });
        }
    } catch(error){
        console.log(error);
        res.status(500).send({
            message: "모니터링 url 수정 실패",
        });
    }
};

// 모니터링 url 삭제
const deleteUrl = async (req,res) => {
    try{
        const project = await Project.findOne({
            where: {
                id: req.params.projectId,
                user_id: req.id
            }
        });
        if(project) {
            let url = await Url.findOne({
                where: {
                    url: req.body.url,
                    project_id: req.params.projectId
                },
            });
            if(url) {
                await project.removeMonitoringUrl(url.id); // MonitoringUrl 테이블의 project_id(FK) 값을 null로 변경한다.
                res.status(200).json({ ProjectId: parseInt(req.params.projectId, 10) });
            }else{
                res.status(403).send({
                    message: "존재하지 않는 url입니다.",
                });
            }
        } else{
            res.status(403).send({
                message: "존재하지 않는 프로젝트입니다.",
            });
        }
    } catch(error){
        console.log(error);
        res.status(500).send({
            message: "모니터링 url 삭제 실패",
        });
    }
}

// 모니터링Url 리스트 확인
const viewUrlList = async (req,res) => {
    // pagination
    // const paged = req.query.paged;
    // const _limit = 10;
    // const _offset = (paged-1) * _limit; // 1페이지부터 시작

    try{
        const project = await Project.findOne({
            where: {
                id: req.params.projectId,
                user_id: req.id
            }
        });
        if(project) {
            const url_list = await Url.findAll({
                where: {
                    project_id: req.params.projectId
                },
                attributes: ['url'],
                // limit:_limit,
                // offset:_offset
            })
            res.status(200).json(url_list);
        } else{
            res.status(403).send({
                message: "존재하지 않는 프로젝트입니다.",
            });
        }
    } catch(error){
        console.log(error);
        res.status(500).send({
            message: "모니터링 url 조회 실패",
        });
    }
}

// 키워드 리스트 확인
const viewKeywordList = async (req,res) => {
    // pagination
    // const paged = req.query.paged;
    // const _limit = 10;
    // const _offset = (paged-1) * _limit; // 1페이지부터 시작

    try{
        const project = await Project.findOne({
            where: {
                id: req.params.projectId,
                user_id: req.id
            }
        });
        if(project) {
            const keyword_list = await project.getKeyword({ // through table에 매칭되어있는 키워드를 가져오기
                attributes: ['keyword'],
                // limit:_limit,
                // offset:_offset
            });
            res.status(200).json(keyword_list);
        } else{
            res.status(403).send({
                message: "존재하지 않는 프로젝트입니다.",
            });
        }
    } catch(error){
        console.log(error);
        res.status(500).send({
            message: "모니터링 url 조회 실패",
        });
    }
}

module.exports = {
    viewProjectList,
    createProject,
    patchProject,
    deleteProject,
    createKeyword,
    deleteKeyword,
    createUrl,
    deleteUrl,
    viewUrlList,
    viewKeywordList,
    patchUrl
};