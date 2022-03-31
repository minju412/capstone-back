module.exports = (sequelize, DataTypes) => {
    const Result = sequelize.define('Result', {
        url: {
            type: DataTypes.STRING(200),
            allowNull: false,
            unique: true,
        },
        title: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        language: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        category: {
            type: DataTypes.ENUM('adult', 'hacking', 'drug', 'gambling', 'murder', 'info_leak', 'weapon', 'unknown'),
            allowNull: false,
        },
        site_tracking_codes: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        personal_information: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        others: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        reference_url: {
            type: DataTypes.STRING(200),
            allowNull: true,
        },
    }, {
        charset: 'utf8',
        collate: 'utf8_general_ci', // 한글 저장
    });
    return Result;
};