require('dotenv').config();
const env = process.env;

const express = require("express");
const app = express();

const cors = require('cors');
const db = require("./models");

// 라우터 설정
const initResultRoutes = require("./routes/result.routes");
const initUserRoutes = require("./routes/user.routes");

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
    secret: env.COOKIE_SECRET
}));
app.use(passport.initialize());
app.use(passport.session());

initResultRoutes(app);
initUserRoutes(app);

db.sequelize.sync()
    .then(() => {
        console.log('db 연결 성공');
    })
    .catch(console.error);



let port = env.PORT;
app.listen(port, () => {
    console.log(`Running at localhost...`);
});