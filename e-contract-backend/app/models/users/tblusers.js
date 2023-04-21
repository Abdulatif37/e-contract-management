module.exports = (sequelize, Sequelize) => {
	const tblusers = sequelize.define("tblusers", {
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		firstname: {
			type: Sequelize.STRING,
			allowNull: false,
		},

		middlename: {
			type: Sequelize.STRING,
			allowNull: false,
		},

		lastname: {
			type: Sequelize.STRING,
			allowNull: false,
		},

		name: {
			type: Sequelize.STRING,
			allowNull: false,
		},

		email: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: true,
			validate: {
				isEmail: true,
			},
		},

		phone: {
			type: Sequelize.INTEGER,
			allowNull: false,
			unique: true,
		},

		password: {
			type: Sequelize.STRING,
			allowNull: false,
		},

		code: {
			type: Sequelize.STRING,
			allowNull: true,
		},

		status: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},

		createdBy: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},

		registration_date: {
			type: Sequelize.DATEONLY,
			allowNull: true,
		},

		// access_level: {
		//     type: Sequelize.INTEGER,
		//     allowNull: true,

		// levels:
		// 1: System Access
		// 2: Business Access
		// 3: Client Access
		// }
	});

	return tblusers;
};
