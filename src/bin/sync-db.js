const models = require("../models");

module.exports = () => {
    // 테스트 모드에서는 db에 데이터를 실제로 삽입하지 않음 (true: 기존 데이터를 날림 / false: 기존 데이터를 날리지 않음‼️)
    const options = {
        force: process.env.NODE_ENV === 'test'? true : false
    };
    return models.sequelize.sync(options);
};