// access token만으로 인증
require('dotenv').config();
const env = process.env;

const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    try {
        const token = req.header("Authorization").split(' ')[1];
        req.decoded = jwt.verify(token, env.JWT_SECRET_KEY)
        next();
    } catch (err) {
        console.log(err);
        if (err.name === 'TokenExpiredError') {
            res.status(419).send('토큰이 만료되었습니다.');
        }
        res.status(401).send('토큰이 유효하지 않습니다.');
    }
};