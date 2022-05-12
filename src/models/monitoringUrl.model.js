module.exports = (sequelize, Sequelize) => {
    const MonitoringUrl = sequelize.define('MonitoringUrl', {
        url: {
            type: Sequelize.STRING(200),
            allowNull: true,
            comment: "모니터링 url",
        },
    }, {
        timestamps: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
    });
    MonitoringUrl.associate = (db) => {
        db.monitoringUrls.belongsTo(db.projects,{foreignKey: "project_id"});
    };
    return MonitoringUrl;
};