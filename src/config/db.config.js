require('dotenv').config();
const env = process.env;

module.exports = {
    HOST:env.MYSQL_HOST,
    USER: env.MYSQL_USERNAME,
    PASSWORD: env.MYSQL_PASSWORD,
    DB: env.MYSQL_DATABASE,
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};