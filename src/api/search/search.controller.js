const db = require("../../models");
const User = db.users;
const Result = db.results;

// 타겟도메인과 유저 id를 받아오는 기능
const getDomain = async (req, res, next) => {
    try {
        const domain = req.body.domain; // 타겟 도메인
        res.status(200).json([{domain, userId:req.user.id}]);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

// 분석 결과(json)를 결과db에 업로드
// const upload = (req, res) => {
//     Result.bulkCreate(results) // db insert
//         .then(() => {
//             res.status(200).send({
//                 message: "db import 성공",
//             });
//         })
//         .catch((error) => {
//             res.status(500).send({
//                 message: "db import 실패",
//                 error: error.message,
//             });
//         });
// };

// 타겟도메인만 받아오는 기능
// const getDomain = (req, res, next) => {
//     try {
//         const domain = req.body.domain; // 타겟 도메인
//         res.status(200).json(domain);
//     } catch (error) {
//         console.error(error);
//         next(error);
//     }
// };

module.exports = {
    getDomain,
    // upload
};