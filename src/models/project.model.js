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
        target_domain: {
            type: Sequelize.STRING(200),
            allowNull: true,
            comment: "타겟 도메인",
        },
        monitoring_url_id: {
            type: Sequelize.STRING(100),
            allowNull: true,
            comment: "모니터링 url 테이블의 id",
        },
        keyword_id: {
            type: Sequelize.STRING(100),
            allowNull: true,
            comment: "키워드 테이블의 id",
        },
    }, {
        timestamps: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
    });
    Project.associate = (db) => {};
    return Project;
};