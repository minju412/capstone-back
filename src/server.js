require('dotenv').config();
const env = process.env;

const express = require("express");
const app = express();
const morgan = require('morgan'); // morgan은 서버의 콘솔로그를 출력

if(process.env.NODE_ENV !== 'test'){ // 테스트 환경에서는 로그없이 깔끔하게 보기 위해서
    app.use(morgan('dev'));
}

const cors = require('cors');

// 패스포트 설정
const passport = require('passport');
app.use(passport.initialize());
require('./middlewares/passport')(passport);
// const passportConfig = require('./passport/passport.index');

// 라우터 설정
const initAuthRoutes = require("./api/auth/auth.routes");
const initCsvRoutes = require("./api/csv/csv.routes");
const initResultRoutes = require("./api/results/results.routes");
const initSearchRoutes = require("./api/search/search.routes");
const initProjectRoutes = require("./api/project/project.routes");

global.__basedir = __dirname + "/..";

const session = require('express-session');
const cookieParser = require('cookie-parser');

// passportConfig();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    // origin: env.CLIENT_PORT,
    origin: true,
    credentials: true, // 쿠키 전달
}));
// app.use(cors());

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

// app.use(passport.initialize()); // 요청 객체에 passport 설정을 심음
// app.use(passport.session()); // req.session 객체에 passport 정보를 추가 저장
//// passport.session()이 실행되면, 세션 쿠키 정보를 바탕으로 passport/passport.index.js의 deserializeUser()가 실행된다.

initAuthRoutes(app);
initCsvRoutes(app);
initResultRoutes(app);
initSearchRoutes(app);
initProjectRoutes(app);

module.exports = app; // app을 모듈로 만들어야 슈퍼테스트 가능