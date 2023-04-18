module.exports = (sequelize, Sequelize) => {
    const tbluser_roles = sequelize.define("tbluser_roles", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },

    });

    return tbluser_roles;
};