const searchServices = require('./search.services')

// 새로운 분석 작업을 생성하여 rabbitmq 로 연결된 파이썬 모듈로 전달
const createNewTask = async (req, res, next) => {
    try {
        const domain = req.body.domain; // 타겟 도메인
        const userId = req.id;
        await searchServices.createNewTask(userId, domain);

        res.status(201).send({domain, userId});
    } catch (error) {
        console.error(error);
        next(error);
    }
};

// 분석이 다됐으면 분석결과를, 없으면 null을 반환
const getTaskResult = async (req, res, next) => {
    try {
        const userId = req.id;
        const result = await searchServices.getTaskResult(userId);
        res.status(200).send(result)
    } catch (error) {
        console.error(error);
        next(error);
    }
}

module.exports = {
    createNewTask,
    getTaskResult
};