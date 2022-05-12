module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('User', {
        userName: {
            type: Sequelize.STRING(100),
            allowNull: false,
            comment: "사용자 이름",
        },
        userEmail: {
            type: Sequelize.STRING(100),
            allowNull: false,
            unique: true,
            comment: "사용자 이메일",
        },
        userPw: {
            type: Sequelize.STRING(200),
            allowNull: false,
            comment: "사용자 비밀번호",
        },
        realTimeStatus: {
            type: Sequelize.STRING(50),
            allowNull: true,
            comment: "실시간 처리 상태",
        },
        realTimeResult: {
            type: Sequelize.JSON,
            allowNull: true,
            comment: "실시간 처리 결과",
        },
    }, {
        timestamps: false,
        charset: 'utf8',
        collate: 'utf8_general_ci', // 한글 저장
    });
    User.associate = (db) => {};
    return User;
};