module.exports = (sequelize, Sequelize) => {
    const tbluser_profiles = sequelize.define("tbluser_profiles", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        img: {
            type: Sequelize.STRING,
            allowNull: true,
        },
    });

    return tbluser_profiles;
};