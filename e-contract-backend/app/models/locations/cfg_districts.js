module.exports = (sequelize, Sequelize) => {
    const cfg_districts = sequelize.define("cfg_districts", {
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

    return cfg_districts;
};