module.exports = (sequelize, Sequelize) => {
    const Result = sequelize.define('Result', {
        // id: {
        //     type: Sequelize.INT,
        //     // allowNull: false,
        //     // primaryKey: true,
        //     autoIncrement: true
        // },
        url: {
            type: Sequelize.STRING(200),
            allowNull: false,
            unique: true,
        },
        title: {
            type: Sequelize.STRING(100),
            allowNull: false,
        },
        lang: {
            type: Sequelize.STRING(20),
            allowNull: false,
        },
        category: {
            type: Sequelize.ENUM('adult', 'hacking', 'drug', 'gambling', 'murder', 'info_leak', 'weapon', 'unknown'),
            allowNull: false,
        },
        site_tracking_codes: {
            type: Sequelize.JSON,
            allowNull: true,
        },
        personal_information: {
            type: Sequelize.JSON,
            allowNull: true,
        },
        etc: {
            type: Sequelize.JSON,
            allowNull: true,
        },
        reference_url: {
            type: Sequelize.STRING(200),
            allowNull: true,
        },
    }, {
        timestamps: false,
        charset: 'utf8',
        collate: 'utf8_general_ci', // 한글 저장
    });
    return Result;
};