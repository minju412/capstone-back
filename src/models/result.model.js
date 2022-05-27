module.exports = (sequelize, Sequelize) => {
    const Result = sequelize.define('Result', {
        url: {
            type: Sequelize.STRING(200),
            allowNull: false,
            unique: true,
            comment: "사이트 url",
        },
        title: {
            type: Sequelize.STRING(200),
            allowNull: false,
            comment: "사이트 이름",
        },
        language: {
            type: Sequelize.STRING(20),
            allowNull: false,
            comment: "사용 언어",
        },
        category: {
            type: Sequelize.ENUM('adult', 'hacking', 'drug', 'gambling', 'murder', 'info_leak', 'weapon', 'unknown'),
            allowNull: false,
            comment: "카테고리",
        },
        site_tracking_codes: {
            type: Sequelize.JSON,
            allowNull: true,
        },
        personal_information: {
            type: Sequelize.JSON,
            allowNull: true,
        },
        others: {
            type: Sequelize.JSON,
            allowNull: true,
        },
        reference_url: {
            type: Sequelize.STRING(200),
            allowNull: true,
        },
        html: {
            type: Sequelize.STRING(200),
            allowNull: true,
        },
        traffic: {
            type: Sequelize.STRING(200),
            allowNull: true,
        },
        image: {
            type: Sequelize.STRING(200),
            allowNull: true,
        },
        search_time: {
            type: Sequelize.STRING(200),
            allowNull: true,
        },
    }, {
        timestamps: false,
        charset: 'utf8',
        collate: 'utf8_general_ci', // 한글 저장
    });
    Result.associate = (db) => {};
    return Result;
};