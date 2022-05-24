const Sequelize = require("sequelize");

const env = process.env.NODE_ENV;
const dbConfig = require("../config/config")[env];

const db = {};

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    },
    logging: false,
});

// 모델 추가
db.results = require("./result.model.js")(sequelize, Sequelize);
db.users = require("./user.model.js")(sequelize, Sequelize);
db.projects = require("./project.model.js")(sequelize, Sequelize);
db.keywords = require("./keyword.model.js")(sequelize, Sequelize);
db.monitoringUrls = require("./monitoringUrl.model.js")(sequelize, Sequelize);
db.monitoringResults = require("./monitoringResult.model.js")(sequelize, Sequelize);

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;