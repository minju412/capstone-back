const db = require("../../models");
const User = db.users;

// 타겟도메인과 유저 id를 받아오는 기능
const getDomain = async (req, res, next) => {
    try {
        const domain = req.body.domain; // 타겟 도메인
        let userId = null;
        if (req.user) {
            userId= await User.findOne({
                where: {id: req.user.id},
                attributes: ['id'],
            })
        }
        res.status(200).json([{domain, userId}]);
        // res.status(200).json([{domain: domain, userId: userId}]);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

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
};