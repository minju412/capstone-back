require('dotenv').config();
const env = process.env;

const express = require("express");
const app = express();
const morgan = require('morgan'); // morgan은 서버의 콘솔로그를 출력
const hpp = require('hpp');
const helmet = require('helmet');

if (process.env.NODE_ENV === 'production'){
    app.use(morgan('combined'));
    app.use(hpp());
    app.use(helmet());
} else{
    app.use(morgan('dev'));
}

const cors = require('cors');

// 패스포트 설정
const passport = require('passport');
app.use(passport.initialize());
require('./middlewares/passport')(passport);

// 라우터 설정
const initAuthRoutes = require("./api/auth/auth.routes");
const initCsvRoutes = require("./api/csv/csv.routes");
const initResultRoutes = require("./api/results/results.routes");
const initSearchRoutes = require("./api/search/search.routes");
const initProjectRoutes = require("./api/project/project.routes");

global.__basedir = __dirname + "/..";

const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const redisClient = require('redis').createClient({url: process.env.REDIS_URL});
const redisOptions = {
    client: redisClient,
    no_ready_check: true,
    ttl: 600,
    logErrors: true
};
const redisSessionStore = new RedisStore(redisOptions);
const cookieParser = require('cookie-parser');

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
    store: redisSessionStore,
    cookie: {
        httpOnly: true,
        secure: false,
        domain: process.env.NODE_ENV === 'production' && '.dwintel.tk'
    }
}));

initAuthRoutes(app);
initCsvRoutes(app);
initResultRoutes(app);
initSearchRoutes(app);
initProjectRoutes(app);

module.exports = app; // app을 모듈로 만들어야 슈퍼테스트 가능