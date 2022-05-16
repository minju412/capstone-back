module.exports = (sequelize, Sequelize) => {
    const Project = sequelize.define('Project', {
        projectName: {
            type: Sequelize.STRING(100),
            allowNull: false,
            unique: true,
            comment: "프로젝트 이름",
        },
        description: {
            type: Sequelize.STRING(100),
            allowNull: true,
            comment: "프로젝트 설명",
        },
        targetDomain: {
            type: Sequelize.STRING(200),
            allowNull: true,
            comment: "타겟 도메인",
        },
    }, {
        timestamps: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
    });
    Project.associate = db => {
        db.projects.hasMany(db.monitoringUrls,{foreignKey: "project_id"}); // project.addMonitoringUrl
        db.projects.hasMany(db.monitoringResults,{foreignKey: "project_id"});

        db.projects.belongsTo(db.users, {foreignKey: "user_id"}); // projects.addUser, projects.removeUser
        db.projects.belongsToMany(db.keywords, {
            through: 'Add',
            as: 'Keyword', // project.addKeyword, project.removeKeyword: 프로젝트에 키워드를 추가/제거
            foreignKey: "project_id",
            // sourceKey: "id"
        });
    };
    return Project;
};