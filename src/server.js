// const test = require("./data/test.js"); ////////

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

// app.use(express.json); ///å

initRoutes(app);

db.sequelize.sync()
    .then(() => {
        console.log('db 연결 성공');
    })
    .catch(console.error);

// db.sequelize.sync();
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// app.use('/', require('./routes')); ///

let port = env.PORT;
app.listen(port, () => {
    console.log(`Running at localhost:${port}`);
});