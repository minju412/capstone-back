const getDomain = (req, res, next) => {
    try {
        const domain = req.body.domain; // 타겟 도메인
        res.status(200).json(domain);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

module.exports = {
    getDomain,
};