require("dotenv").config({
	path: "./app/.env",
});
const db = require("../../models");
const capitalize = require("capitalize-the-first-letter");
const cfg_access_level = db.cfg_access_level;
const cfg_section = db.cfg_section;
const tbluser_profiles = db.tbluser_profiles;
const tblusers = db.tblusers;
const Op = db.Sequelize.Op;

exports.add = (req, res) => {
	const name = req.body.name;

	cfg_section
		.create({
			name: name,
			status: true,
		})
		.then(() => {
			res.status(200).json({
				message: "Section successful added",
			});
		})
		.catch((err) => {
			res.status(500).json({
				message: err.errors[0].message,
			});
		});
};

exports.edit = (req, res) => {
	const id = req.body.id;
	const name = req.body.name;

	cfg_section
		.findOne({
			where: {
				id: id,
			},
		})
		.then((result) => {
			result.update({
				name: name,
			});

			res.status(200).json({
				message: "Profile successful updated",
			});
		})
		.catch((err) => {
			res.status(500).json({
				message: err.errors[0].message,
			});
		});
};

exports.findAll = (req, res) => {
	cfg_section
		.findAll({
			order: [["name", "ASC"]],
		})
		.then((data) => {
			res.status(200).json({
				message: "Section(s) found",
				section: data,
			});
		})
		.catch((err) => {
			res.status(500).json({
				message: "Section(s) not found",
			});
		});
};

exports.findOne = (req, res) => {
	const id = req.body.id;

	cfg_section
		.findOne({
			where: {
				id: id,
			},
		})
		.then((data) => {
			res.status(200).json({
				message: "Section(s) found",
				data: data,
			});
		})
		.catch((err) => {
			res.status(500).json({
				message: "Section(s) not found",
			});
		});
};

exports.activate = (req, res) => {
	const id = req.body.id;

	cfg_section
		.findOne({
			where: {
				id: id,
			},
		})
		.then((data) => {
			data.update({
				status: true,
			});

			res.status(200).json({
				message: "Section successful activated",
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

	cfg_section
		.findOne({
			where: {
				id: id,
			},
		})
		.then((data) => {
			data.update({
				status: false,
			});

			res.status(200).send({
				message: "Section successful deactivated",
			});
		})
		.catch((err) => {
			res.status(500).send({
				message: err.errors[0].message,
			});
		});
};
