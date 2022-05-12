module.exports = (sequelize, Sequelize) => {
    const Keyword = sequelize.define('Keyword', {
        keyword: {
            type: Sequelize.STRING(200),
            allowNull: true,
            comment: "키워드",
        },
    }, {
        timestamps: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
    });
    Keyword.associate = (db) => {
        db.keywords.belongsToMany(db.projects, {
            through: 'Add',
            foreignKey: "keyword_id",
            // sourceKey: "id"
        });
    };
    return Keyword;
};