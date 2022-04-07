module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('User', {
        userName: {
            type: Sequelize.STRING(100),
            allowNull: false,
        },
        userEmail: {
            type: Sequelize.STRING(100),
            allowNull: false,
            unique: true,
        },
        userPw: {
            type: Sequelize.STRING(200),
            allowNull: false,
        },
    }, {
        timestamps: false,
        charset: 'utf8',
        collate: 'utf8_general_ci', // 한글 저장
    });
    return User;
};