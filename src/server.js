require('dotenv').config();
const env = process.env;

const express = require("express");
const app = express();

const cors = require('cors');

const db = require("./models");
const initRoutes = require("./routes/result.routes");
global.__basedir = __dirname + "/..";

app.use(express.urlencoded({ extended: true }));
app.use(cors());

initRoutes(app);

db.sequelize.sync()
    .then(() => {
        console.log('db 연결 성공');
    })
    .catch(console.error);

let port = env.PORT;
app.listen(port, () => {
    console.log(`Running at localhost:${port}`);
});