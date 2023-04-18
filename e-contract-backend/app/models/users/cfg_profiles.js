module.exports = (sequelize, Sequelize) => {
    const cfg_profiles = sequelize.define("cfg_profiles", {
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

    return cfg_profiles;
};