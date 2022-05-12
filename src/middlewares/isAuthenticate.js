// passport-jwt

exports.isAuthenticate = (req, res, next) => {
    if (req.user) {
        console.log(req.user);
        next();
    } else {
        res.status(401).send('로그인이 필요합니다.');
    }
};