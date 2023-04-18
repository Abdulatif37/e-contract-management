module.exports = (sequelize, Sequelize) => {
    const cfg_business_category = sequelize.define("cfg_business_category", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },

        status: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        }
    });

    return cfg_business_category;
};