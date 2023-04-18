module.exports = (sequelize, Sequelize) => {
    const cfg_roles = sequelize.define("cfg_roles", {
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
            allowNull: false,

        }
    });

    return cfg_roles;
};