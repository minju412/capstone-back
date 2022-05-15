const { verify } = require('./jwt-util');

const authJWT = (req, res, next) => {
    if (req.header("Authorization")) {
        const token = req.header("Authorization"); // header에서 access token을 가져온다.
        const result = verify(token); // token 검증
        if (result.ok) { // token이 검증되었으면
            req.id = result.id;
            req.userName = result.userName;
            next();
        } else { // 검증에 실패하거나 토큰이 만료되었다면 클라이언트에게 메세지를 담아서 응답한다.
            res.status(401).send({
                ok: false,
                message: result.message, // jwt가 만료되었다면 메세지는 'jwt expired'
            });
        }
    }
};

module.exports = authJWT;