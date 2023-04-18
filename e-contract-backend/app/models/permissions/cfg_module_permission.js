module.exports = (sequelize, Sequelize) => {
    const cfg_module_permission = sequelize.define("cfg_module_permission", {
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

    return cfg_module_permission;
};