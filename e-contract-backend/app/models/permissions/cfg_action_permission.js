module.exports = (sequelize, Sequelize) => {
    const cfg_action_permission = sequelize.define("cfg_action_permission", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },

        permission: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        }
    });

    return cfg_action_permission;
};