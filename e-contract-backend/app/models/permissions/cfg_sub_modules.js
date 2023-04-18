module.exports = (sequelize, Sequelize) => {
    const cfg_sub_modules = sequelize.define("cfg_sub_modules", {
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

        link: {
            type: Sequelize.STRING,
            allowNull: false,
        },

        icon: {
            type: Sequelize.STRING,
            allowNull: false,
        },

        linkName: {
            type: Sequelize.STRING,
            allowNull: false,
        },

        status: {
            type: Sequelize.BOOLEAN,
            allowNull: false,

        }
    });

    return cfg_sub_modules;
};