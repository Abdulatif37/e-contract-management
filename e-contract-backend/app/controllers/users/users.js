require("dotenv").config({
	path: "./app/.env",
});
const db = require("../../models");
const pass = require("../../config/password");
const capitalize = require("../../../node_modules/capitalize-the-first-letter/capitalize");
const mail = require("../../config/mail");
const path = require("path");
var bcrypt = require("bcryptjs");
const user_roles = db.tbluser_roles;
const cfg_roles = db.cfg_roles;
const tblusers = db.tblusers;
const tbluser_profiles = db.tbluser_profiles;
const tblbusiness_name = db.tblbusiness_name;
const cfg_profiles = db.cfg_profiles;

const Op = db.Sequelize.Op;

exports.findOne = (req, res) => {
	const id = req.body.id;
	tblusers
		.findOne({
			where: {
				id: id,
			},
			attributes: {
				exclude: ["password", "code", "createdBy"],
			},
			include: [
				{
					model: tbluser_profiles,
					include: [
						{
							model: cfg_profiles,
						},
					],
				},
			],
		})
		.then((data) => {
			res.status(200).json({
				message: "User found successfully",
				data: data,
			});
		})
		.catch((err) => {
			res.status(500).json({
				message: "User not found",
			});
		});
};

exports.userRoles = (req, res) => {
	const id = req.params.id;
	user_roles
		.findAll({
			where: {
				userId: id,
			},
		})
		.then((data) => {
			res.status(200).send(data);
		})
		.catch((err) => {
			res.status(500).json({
				message: "User role(s) not found",
			});
		});
};
