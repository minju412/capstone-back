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

// module.exports = {
//     development : {
//         HOST:env.MYSQL_HOST,
//         USER: env.MYSQL_USERNAME,
//         PASSWORD: env.MYSQL_PASSWORD,
//         DB: env.MYSQL_DATABASE,
//         dialect: "mysql",
//         pool: {
//             max: 5,
//             min: 0,
//             acquire: 30000,
//             idle: 10000
//         }
//     },
//     test : {
//         HOST:env.MYSQL_HOST,
//         USER: env.MYSQL_USERNAME,
//         PASSWORD: env.MYSQL_PASSWORD,
//         DB: env.MYSQL_DATABASE,
//         dialect: "mysql",
//         pool: {
//             max: 5,
//             min: 0,
//             acquire: 30000,
//             idle: 10000
//         }
//     },
//     production : {
//         HOST:env.MYSQL_HOST,
//         USER: env.MYSQL_USERNAME,
//         PASSWORD: env.MYSQL_PASSWORD,
//         DB: env.MYSQL_DATABASE,
//         dialect: "mysql",
//         pool: {
//             max: 5,
//             min: 0,
//             acquire: 30000,
//             idle: 10000
//         }
//     },
// };

