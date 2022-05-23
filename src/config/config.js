// require('dotenv').config();
// const env = process.env;

// module.exports = {
//     HOST:env.MYSQL_HOST,
//     USER: env.MYSQL_USERNAME,
//     PASSWORD: env.MYSQL_PASSWORD,
//     DB: env.MYSQL_DATABASE,
//     dialect: "mysql",
//     pool: {
//         max: 5,
//         min: 0,
//         acquire: 30000,
//         idle: 10000
//     }
// };

const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    development : {
        host:process.env.MYSQL_HOST,
        username: process.env.MYSQL_USERNAME,
        password: process.env.MYSQL_PASSWORD,
        port: process.env.MYSQL_PORT,
        database: process.env.MYSQL_DATABASE,
        dialect: "mysql",
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    },
    test : {
        host:process.env.MYSQL_HOST,
        username: process.env.MYSQL_USERNAME,
        password: process.env.MYSQL_PASSWORD,
        port: process.env.MYSQL_PORT,
        database: process.env.MYSQL_DATABASE,
        dialect: "mysql",
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    },
    production : {
        host:process.env.MYSQL_HOST,
        username: process.env.MYSQL_USERNAME,
        password: process.env.MYSQL_PASSWORD,
        port: process.env.MYSQL_PORT,
        database: process.env.MYSQL_DATABASE,
        dialect: "mysql",
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    },
};

