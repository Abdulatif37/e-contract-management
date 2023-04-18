module.exports = (sequelize, Sequelize) => {
    const tblbusiness_name = sequelize.define("tblbusiness_name", {
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

        latitude: {
            type: Sequelize.TEXT,
            allowNull: true,
        },

        longitude: {
            type: Sequelize.TEXT,
            allowNull: true,
        },

        status: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        }
    });

    return tblbusiness_name;
};