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
        realTimeStatus: { // 실시간 처리 상태
            type: Sequelize.STRING(50),
            allowNull: true,
        },
        realTimeResult: { // 실시간 처리 결과
            type: Sequelize.JSON,
            allowNull: true,
        },
    }, {
        timestamps: false,
        charset: 'utf8',
        collate: 'utf8_general_ci', // 한글 저장
    });
    return User;
};