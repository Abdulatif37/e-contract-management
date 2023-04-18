module.exports = (sequelize, Sequelize) => {
    const cfg_section = sequelize.define("cfg_section", {
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

    return cfg_section;
};