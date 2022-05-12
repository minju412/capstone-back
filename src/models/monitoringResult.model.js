module.exports = (sequelize, Sequelize) => {
    const MonitoringResult = sequelize.define('MonitoringResult', {
        MonitoringResult: {
            type: Sequelize.JSON,
            allowNull: true,
            comment: "모니터링 결과",
        },
    }, {
        timestamps: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
    });
    MonitoringResult.associate = (db) => {};
    return MonitoringResult;
};