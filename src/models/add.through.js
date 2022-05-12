module.exports = (sequelize, Sequelize) => {
    const Add = sequelize.define('Add', {}, {timestamps: false,} );
    Add.associate = (db) => {};
    return Add;
};