// 실행시켜주는 스크립트
require('dotenv').config();
const env = process.env;

const app = require('../server');
const syncDb = require('./sync-db');
let port = env.PORT;

syncDb().then(_ => {
    console.log('Sync database!');
    app.listen(port, () => {
        console.log(`Running at localhost...`);
    });
});

