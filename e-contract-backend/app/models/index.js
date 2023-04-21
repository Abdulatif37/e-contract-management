require("dotenv").config({
	path: "./app/.env",
});
const { toInteger } = require("lodash");
const Sequelize = require("sequelize");
const db = {};

const sequelize = new Sequelize(
	process.env.DB,
	process.env.USER,
	process.env.PASSWORD,
	{
		host: process.env.HOST,
		dialect: process.env.dialect,

		pool: {
			max: toInteger(process.env.pool_max),
			min: toInteger(process.env.pool_min),
			acquire: toInteger(process.env.pool_acquire),
			idle: toInteger(process.env.pool_idle),
		},
	}
);

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// =============================================================================
// DATABASE TABLE PERMISSIONS
// =============================================================================
db.cfg_modules = require("../models/permissions/cfg_modules")(
	sequelize,
	Sequelize
);
db.cfg_sub_modules = require("../models/permissions/cfg_sub_modules")(
	sequelize,
	Sequelize
);
db.cfg_sub_module_action =
	require("../models/permissions/cfg_sub_module_action")(sequelize, Sequelize);
db.cfg_module_permission =
	require("../models/permissions/cfg_module_permission")(sequelize, Sequelize);
db.cfg_sub_module_permission =
	require("../models/permissions/cfg_sub_module_permission")(
		sequelize,
		Sequelize
	);
db.cfg_action_permission =
	require("../models/permissions/cfg_action_permission")(sequelize, Sequelize);
db.cfg_roles = require("../models/permissions/cfg_roles")(sequelize, Sequelize);

// =============================================================================
// DATABASE TABLE SYSTEM SERVICES
// =============================================================================
db.cfg_services = require("../models/services/cfg_services")(
	sequelize,
	Sequelize
);

// =============================================================================
// DATABASE TABLE USERS
// =============================================================================
db.tblusers = require("../models/users/tblusers")(sequelize, Sequelize);
db.tbluser_roles = require("../models/users/tbluser_roles")(
	sequelize,
	Sequelize
);
db.tbluser_profiles = require("../models/users/tbluser_profiles")(
	sequelize,
	Sequelize
);
db.cfg_profiles = require("../models/users/cfg_profiles")(sequelize, Sequelize);
db.cfg_section = require("./users/cfg_section")(sequelize, Sequelize);

db.cfg_regions = require("../models/locations/cfg_regions")(
	sequelize,
	Sequelize
);
db.cfg_districts = require("../models/locations/cfg_districts")(
	sequelize,
	Sequelize
);

//====================================================
// LOCATIONS
//====================================================
db.cfg_regions.hasMany(db.cfg_districts, {
	foreignKey: "regionId",
	onDelete: "CASCADE",
	onUpdate: "CASCADE",
});

db.cfg_districts.belongsTo(db.cfg_regions, {
	through: db.cfg_regions,
	foreignKey: "regionId",
	onDelete: "CASCADE",
	onUpdate: "CASCADE",
});

//====================================================
// USERS, PROFILES ROLES
//====================================================

db.tblusers.hasOne(db.tbluser_profiles, {
	foreignKey: "userId",
	onDelete: "CASCADE",
	onUpdate: "CASCADE",
});

db.tbluser_profiles.belongsTo(db.tblusers, {
	through: db.tblusers,
	foreignKey: "userId",
	onDelete: "CASCADE",
	onUpdate: "CASCADE",
});

db.cfg_profiles.hasMany(db.tbluser_profiles, {
	foreignKey: "profileId",
	onDelete: "CASCADE",
	onUpdate: "CASCADE",
});

db.tbluser_profiles.belongsTo(db.cfg_profiles, {
	through: db.cfg_profiles,
	foreignKey: "profileId",
	onDelete: "CASCADE",
	onUpdate: "CASCADE",
});

db.cfg_roles.hasMany(db.tbluser_roles, {
	foreignKey: "roleId",
	onDelete: "CASCADE",
	onUpdate: "CASCADE",
});

db.tbluser_roles.belongsTo(db.cfg_roles, {
	through: db.cfg_roles,
	foreignKey: "roleId",
	onDelete: "CASCADE",
	onUpdate: "CASCADE",
});

db.tblusers.hasMany(db.tbluser_roles, {
	foreignKey: "userId",
	onDelete: "CASCADE",
	onUpdate: "CASCADE",
});

db.tbluser_roles.belongsTo(db.tblusers, {
	through: db.tblusers,
	foreignKey: "userId",
	onDelete: "CASCADE",
	onUpdate: "CASCADE",
});

//====================================================
// MODULE PERMISSIONS
//====================================================
db.cfg_modules.hasMany(db.cfg_sub_modules, {
	foreignKey: "moduleId",
	onDelete: "CASCADE",
	onUpdate: "CASCADE",
});

db.cfg_modules.hasMany(db.cfg_module_permission, {
	foreignKey: "moduleId",
	onDelete: "CASCADE",
	onUpdate: "CASCADE",
});

db.cfg_roles.hasMany(db.cfg_module_permission, {
	foreignKey: "roleId",
	onDelete: "CASCADE",
	onUpdate: "CASCADE",
});

//====================================================
// SUB MODULE PERMISSIONS
//====================================================
db.cfg_modules.hasMany(db.cfg_sub_module_permission, {
	foreignKey: "moduleId",
	onDelete: "CASCADE",
	onUpdate: "CASCADE",
});

db.cfg_sub_modules.hasMany(db.cfg_sub_module_permission, {
	foreignKey: "sub_moduleId",
	onDelete: "CASCADE",
	onUpdate: "CASCADE",
});

db.cfg_roles.hasMany(db.cfg_sub_module_permission, {
	foreignKey: "roleId",
	onDelete: "CASCADE",
	onUpdate: "CASCADE",
});

//====================================================
// SUB MODULE ACTIONS
//====================================================
db.cfg_modules.hasMany(db.cfg_sub_module_action, {
	foreignKey: "moduleId",
	onDelete: "CASCADE",
	onUpdate: "CASCADE",
});

db.cfg_sub_modules.hasMany(db.cfg_sub_module_action, {
	foreignKey: "sub_moduleId",
	onDelete: "CASCADE",
	onUpdate: "CASCADE",
});

//====================================================
// SYSTEM ACTIONS PERMISSION
//====================================================

db.cfg_sub_module_action.hasMany(db.cfg_action_permission, {
	foreignKey: "actionId",
	onDelete: "CASCADE",
	onUpdate: "CASCADE",
});

db.cfg_modules.hasMany(db.cfg_action_permission, {
	foreignKey: "moduleId",
	onDelete: "CASCADE",
	onUpdate: "CASCADE",
});

db.cfg_sub_modules.hasMany(db.cfg_action_permission, {
	foreignKey: "sub_moduleId",
	onDelete: "CASCADE",
	onUpdate: "CASCADE",
});

db.cfg_roles.hasMany(db.cfg_action_permission, {
	foreignKey: "roleId",
	onDelete: "CASCADE",
	onUpdate: "CASCADE",
});

module.exports = db;
