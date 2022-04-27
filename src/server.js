require('dotenv').config();
const env = process.env;

const express = require("express");
const app = express();

const cors = require('cors');
const db = require("./models");

// 라우터 설정
const initResultRoutes = require("./routes/result.routes");
const initAuthRoutes = require("./routes/auth.routes");

global.__basedir = __dirname + "/..";

const session = require('express-session');
const cookieParser = require('cookie-parser');

const passport = require('passport');
const passportConfig = require('./passport/passport.index');

passportConfig();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// app.use(cors({
//     origin: '*'
// }));

app.use(cookieParser(env.COOKIE_SECRET));
app.use(session({
    saveUninitialized: false,
    resave: false,
    secret: env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    }
}));
app.use(passport.initialize()); // 요청 객체에 passport 설정을 심음
app.use(passport.session()); // req.session 객체에 passport 정보를 추가 저장
// pssport.session()이 실행되면, 세션 쿠키 정보를 바탕으로 passport/passport.index.js의 deserializeUser()가 실행된다.

initResultRoutes(app);
initAuthRoutes(app);

db.sequelize.sync()
    .then(() => {
        console.log('db 연결 성공');
    })
    .catch(console.error);



let port = env.PORT;
app.listen(port, () => {
    console.log(`Running at localhost...`);
});