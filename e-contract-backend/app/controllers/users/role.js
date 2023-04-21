require("dotenv").config({
	path: "./app/.env",
});
const db = require("../../models");
const capitalize = require("../../../node_modules/capitalize-the-first-letter");
const Roles = db.cfg_roles;

const appModule = db.cfg_modules;
const appSubModule = db.cfg_sub_modules;
const appAction = db.cfg_sub_module_action;
const cfg_module = db.cfg_module_permission;
const cfg_sub_modules = db.cfg_sub_module_permission;
const cfg_sub_module_action = db.cfg_action_permission;
const tblusers = db.tblusers;
const tbluser_profiles = db.tbluser_profiles;

const Op = db.Sequelize.Op;

exports.add = (req, res) => {
	const userId = req.body.userId;
	const name = req.body.name;

	Roles.create({
		name: name,
		status: true,
	})
		.then((role) => {
			appModule
				.findAll()
				.then((module) => {
					for (const key in module) {
						cfg_module
							.create({
								permission: false,
								moduleId: module[key].id,
								roleId: role.id,
							})
							.catch((err) => {
								res.status(500).send({
									message: err.errors[0].message,
								});
							});
					}
				})
				.then((modulePermissions) => {
					appSubModule
						.findAll()
						.then((submodule) => {
							for (const key in submodule) {
								cfg_sub_modules
									.create({
										permission: false,
										moduleId: submodule[key].moduleId,
										sub_moduleId: submodule[key].id,
										roleId: role.id,
									})
									.catch((err) => {
										res.status(500).send({
											message: err.errors[0].message,
										});
									});
							}
						})
						.then((subModulePermissions) => {
							appAction
								.findAll()
								.then((action) => {
									for (const key in action) {
										cfg_sub_module_action
											.create({
												permission: false,
												moduleId: action[key].moduleId,
												sub_moduleId: action[key].sub_moduleId,
												actionId: action[key].id,
												roleId: role.id,
											})
											.catch((err) => {
												res.status(500).send({
													message: err.errors[0].message,
												});
											});
									}
								})
								.catch((err) => {
									res.status(500).send({
										message: err.errors[0].message,
									});
								});
						})
						.then(() => {
							res.status(200).send({
								message: role.name + " Successfull created",
							});
						})
						.catch((err) => {
							res.status(500).send({
								message: err.errors[0].message,
							});
						});
				})
				.catch((err) => {
					res.status(500).send({
						message: err.errors[0].message,
					});
				});
		})
		.catch((err) => {
			res.status(500).send({
				message: err.errors[0].message,
			});
		});
};

exports.edit = (req, res) => {
	const id = req.body.id;
	const name = req.body.name;

	Roles.findOne({
		where: {
			id: id,
		},
	})
		.then((data) => {
			Roles.update({
				name: name,
			})
				.then(() => {
					res.status(200).json({
						message: "Role updated successfully",
					});
				})

				.catch((err) => {
					res.status(500).send({
						message: err.errors[0].message,
					});
				});
		})
		.catch((err) => {
			res.status(500).json({
				message: err.errors[0].message,
			});
		});
};

exports.findOne = (req, res) => {
	const id = req.body.id;

	Roles.findOne({
		where: {
			id: id,
		},
	})
		.then((data) => {
			res.status(200).json({
				message: "Role Successful found",
				data: data,
			});
		})
		.catch((err) => {
			res.status(500).json({
				message: "No Role(s) found",
			});
		});
};

exports.findAll = (req, res) => {
	Roles.findAll({
		order: [["name", "ASC"]],
	})
		.then((data) => {
			res.status(200).json({
				message: "Role(s) found",
				data: data,
			});
		})
		.catch((err) => {
			res.status(500).send({
				message: "Some error occurred while retrieving Roles.",
			});
		});
};

exports.activate = (req, res) => {
	const id = req.body.id;

	Roles.findOne({
		where: {
			id: id,
		},
	})
		.then((result) => {
			result.update({
				status: true,
			});

			res.status(200).send({
				message: "Role Successful Activated",
			});
		})
		.catch((err) => {
			res.status(500).send({
				message: err.errors[0].message,
			});
		});
};

exports.deactivate = (req, res) => {
	const id = req.body.id;

	Roles.findOne({
		where: {
			id: id,
		},
	})
		.then((result) => {
			result.update({
				status: false,
			});

			res.status(200).send({
				message: "Role Successful Deactivated",
			});
		})
		.catch((err) => {
			res.status(500).send({
				message: err.errors[0].message,
			});
		});
};
