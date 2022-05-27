const taskManager = require('../../amqp_client/taskManager')
const db = require("../../models")
const User = db.users;

async function createNewTask(userId, domain) {
    try{
        // 분석결과,상태에 각각 null과 PENDING 삽입
        await User.update(
            {
                realTimeResult: 'null',
                realTimeStatus: 'PENDING',
            },
            { where: {id: userId} }
        )
        await taskManager.requestTask(`${userId}`, {domain});
    } catch(err) {
        console.error(err)
    }
}

async function processTaskResult(taskId, result) {
    try{
        // 분석결과,상태에 각각 result와 SUCCESS 삽입
        await User.update(
            {
                realTimeResult: result,
                realTimeStatus: 'SUCCESS',
            },
            { where: {id: taskId} }
        )
    } catch(err) {
        console.error(err)
    }
    console.log(`[+] id: ${taskId}, result: ${JSON.stringify(result)}`)
}

// Db에 저장된 분석결과를 유저가 확인하는 기능 // success일 경우에만 분석결과(json)를 리턴하고 ready,pending은 해당 메시지 전달!
async function getTaskResult(userId) {
    const user = await User.findOne({
        where: {
            id: userId
        }
    })
    if (user.realTimeStatus === 'READY') return '아직 분석이 시작되지 않았습니다.';
    if (user.realTimeStatus === 'PENDING') return '분석이 시작되었습니다. 잠시 기다려주세요.';
    if (user.realTimeStatus === 'SUCCESS') return user.realTimeResult
    // if user(userId).realTimeStatus is READY, then return null
    // if user(userId).realTimeStatus is PENDING, then return null
    // if user(userId).realTimeStatus is SUCCESS, then return user(userId).realTimeResult
}

module.exports = {
    createNewTask,
    processTaskResult,
    getTaskResult
}
