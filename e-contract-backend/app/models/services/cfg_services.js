module.exports = (sequelize, Sequelize) => {
    const cfg_services = sequelize.define("cfg_services", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },

        name: {
            type: Sequelize.TEXT,
            allowNull: false,
            unique: true,
        },

        status: {
            type: Sequelize.BOOLEAN,
            allowNull: false,

        },

    });

    return cfg_services;
};