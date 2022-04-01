// const Sequelize = require('sequelize');
// const env = process.env.NODE_ENV || 'development';
// const config = require('../config/config')[env];
// const db = {};
//
// const sequelize = new Sequelize(config.database, config.username, config.password, config);
//
// db.results = require("./result.model.js")(sequelize, Sequelize);
//
// db.sequelize = sequelize;
// db.Sequelize = Sequelize;
//
// module.exports = db;


const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.results = require("./result.model.js")(sequelize, Sequelize);
module.exports = db;