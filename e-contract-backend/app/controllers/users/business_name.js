require("dotenv").config({
    path: "./app/.env",
});
const db = require("../../models");
const capitalize = require("capitalize-the-first-letter");
const tblbusiness_name = db.tblbusiness_name;
const cfg_business_category = db.cfg_business_category;
const Op = db.Sequelize.Op;

exports.add = (req, res) => {
    const name = req.body.name;
    const categoryId = req.body.categoryId;

    tblbusiness_name
        .create({
            name: name,
            categoryId: categoryId,
            status: true,
        })
        .then((data) => {
            res.status(200).json({
                message: "Business name successfully added",
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
    const categoryId = req.body.category;

    tblbusiness_name
        .findOne({
            where: {
                id: id,
            },
        })
        .then((data) => {
            data.update({
                name: name,
                categoryId: categoryId,
            });

            res.status(200).json({
                message: "Business name updated",
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: err.errors[0].message,
            });
        });
};

exports.findAll = (req, res) => {
    tblbusiness_name
        .findAll({
            include: [{
                model: cfg_business_category,
            }, ],
            order: [
                ["name", "ASC"]
            ],
        })
        .then((data) => {
            res.status(200).json({
                message: "Business name(s) successfully found",
                data: data,
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: "Business name(s) not found",
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.body.id;

    tblbusiness_name
        .findOne({
            where: {
                id: id,
            },
        })
        .then((data) => {
            res.status(200).json({
                message: "Business name successfully found",
                data: data,
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: "Business name not found",
            });
        });
};

exports.activate = (req, res) => {
    const id = req.body.id;

    tblbusiness_name
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
                message: "Business name successsfully activated",
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: err.errors[0].message,
            });
        });
};

exports.deactivate = (req, res) => {
    const id = req.body.id;

    tblbusiness_name
        .findOne({
            where: {
                id: id,
            },
        })
        .then((data) => {
            data.update({
                status: false,
            });

            res.status(200).json({
                message: "Business name successsfully deactivated",
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: err.errors[0].message,
            });
        });
};