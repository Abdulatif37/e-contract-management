module.exports = (sequelize, Sequelize) => {
    const cfg_sub_module_action = sequelize.define("cfg_sub_module_action", {
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

        status: {
            type: Sequelize.BOOLEAN,
            allowNull: false,

        }
    });

    return cfg_sub_module_action;
};