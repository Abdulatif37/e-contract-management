module.exports = (sequelize, Sequelize) => {
    const cfg_modules = sequelize.define("cfg_modules", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },

        name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },

        icon: {
            type: Sequelize.STRING,
            allowNull: false,
        },

        linkName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        status: {
            type: Sequelize.BOOLEAN,
            allowNull: false,

        }
    });

    return cfg_modules;
};