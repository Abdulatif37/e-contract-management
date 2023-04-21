require("dotenv").config({
	path: "./app/.env",
});
const db = require("../../models");
const capitalize = require("capitalize-the-first-letter");
const cfg_profiles = db.cfg_profiles;
const Op = db.Sequelize.Op;

exports.add = (req, res) => {
	const name = req.body.name;

	cfg_profiles
		.create({
			name: name,
			status: true,
		})
		.then(() => {
			res.status(200).json({
				message: "Profile successful added",
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

	cfg_profiles
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

exports.findOne = (req, res) => {
	const id = req.body.id;

	cfg_profiles
		.findOne({
			where: {
				id: id,
			},
		})
		.then((data) => {
			res.status(200).json({
				message: "Profile(s) found",
				data: data,
			});
		})
		.catch((err) => {
			res.status(500).json({
				message: "Profile(s) not found",
			});
		});
};

exports.findAll = (req, res) => {
	cfg_profiles
		.findAll({
			order: [["name", "ASC"]],
		})
		.then((data) => {
			res.status(200).json({
				message: "Profile(s) found",
				data: data,
			});
		})
		.catch((err) => {
			res.status(500).json({
				message: "Profile(s) not found",
			});
		});
};

exports.activate = (req, res) => {
	const id = req.body.id;

	cfg_profiles
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
				message: "Profile successful activated",
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

	cfg_profiles
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
				message: "Profile successful deactivated",
			});
		})
		.catch((err) => {
			res.status(500).send({
				message: err.errors[0].message,
			});
		});
};
