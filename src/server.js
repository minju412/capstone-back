const express = require("express");
const app = express();
const db = require("./models");
const initRoutes = require("./routes/result.routes");
global.__basedir = __dirname + "/..";
app.use(express.urlencoded({ extended: true }));
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
let port = 3065;
app.listen(port, () => {
    console.log(`Running at localhost:${port}`);
});