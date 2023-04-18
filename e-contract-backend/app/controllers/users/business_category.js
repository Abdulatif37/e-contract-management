require('dotenv').config({
    path: './app/.env'
});
const db = require("../../models");
const capitalize = require("capitalize-the-first-letter");
const cfg_business_category = db.cfg_business_category;
const Op = db.Sequelize.Op;



exports.add = (req, res) => {
    const name = req.body.name;

    cfg_business_category.create({
            name: name,
            status: true
        })
        .then((data) => {
            res.status(200).json({
                message: "Business category successfully added"
            })
        })
        .catch((err) => {
            res.status(500).json({
                message: err.errors[0].message,
            })
        })

};

exports.edit = (req, res) => {
    const id = req.body.id;
    const name = req.body.name;

    cfg_business_category.findOne({
            where: {
                id: id
            }
        })
        .then((data) => {
            data.update({
                name: name,
            });

            res.status(200).json({
                message: "Business category updated"
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: err.errors[0].message,
            });
        })
};

exports.findAll = (req, res) => {
    cfg_business_category.findAll({
            order: [
                ['name', 'ASC'],
            ],
        })
        .then((data) => {
            res.status(200).json({
                message: "Business categories successfully found",
                data: data
            })
        })
        .catch((err) => {
            res.status(500).json({
                message: "Business categories not found"
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.body.id;

    cfg_business_category.findOne({
            where: {
                id: id
            }
        })
        .then((data) => {
            res.status(200).json({
                message: "Business category successfully found",
                data: data
            })
        })
        .catch((err) => {
            res.status(500).json({
                message: "Business category not found"
            });
        });
};

exports.activate = (req, res) => {
    const id = req.body.id;

    cfg_business_category.findOne({
            where: {
                id: id
            }
        })
        .then((data) => {
            data.update({
                status: true
            });

            res.status(200).json({
                message: "Business category successsfully activated"
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: err.errors[0].message,
            });
        })
};

exports.deactivate = (req, res) => {
    const id = req.body.id;

    cfg_business_category.findOne({
            where: {
                id: id
            }
        })
        .then((data) => {
            data.update({
                status: false
            });

            res.status(200).json({
                message: "Business category successsfully deactivated"
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: err.errors[0].message,
            });
        })
};