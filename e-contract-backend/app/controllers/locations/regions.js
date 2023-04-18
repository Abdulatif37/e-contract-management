require('dotenv').config({
    path: './app/.env'
});
const db = require("../../models");
const capitalize = require("capitalize-the-first-letter");
const cfg_regions = db.cfg_regions;
const cfg_districts = db.cfg_districts;
const Op = db.Sequelize.Op;

exports.add = (req, res) => {
    const name = req.body.name;

    cfg_regions.create({
            name: name,
            status: true
        })
        .then((data) => {
            res.status(200).json({
                message: "Region successfully added"
            })
        })
        .catch((err) => {
            res.status(500).json({
                message: err.errors[0].message,
            })
        })
}

exports.edit = (req, res) => {

    const id = req.body.id;
    const name = req.body.name;

    cfg_regions.findOne({
            where: {
                id: id
            }
        })
        .then((data) => {
            data.update({
                    name: name
                })
                .then((data) => {
                    res.status(200).json({
                        message: "Region successfully updated"
                    })
                })
                .catch((err) => {
                    res.status(500).json({
                        message: "Fail to update Region",
                    })
                })
        })
        .catch((err) => {
            res.status(500).json({
                message: err.errors[0].message,
            })
        })
}

exports.findAll = (req, res) => {

    cfg_regions.findAll({
            order: [
                ['name', 'ASC'],
            ],
        })
        .then((data) => {
            res.status(200).json({
                message: "Region(s) found",
                data: data
            })
        })
        .catch((err) => {
            res.status(500).json({
                message: " No Region(s) found"
            })
        })
}

exports.findOne = (req, res) => {
    const id = req.body.id;
    cfg_regions.findOne({
            where: {
                id: id
            },
            include: [{
                model: cfg_districts
            }]
        })
        .then((data) => {
            res.status(200).json({
                message: "Region found",
                data: data
            })
        })
        .catch((err) => {
            res.status(500).json({
                message: " No Region found"
            })
        })
}

exports.activate = (req, res) => {
    const id = req.body.id;

    cfg_regions.findOne({
            where: {
                id: id
            }
        })
        .then((data) => {
            data.update({
                    status: true
                })
                .then((data) => {
                    res.status(200).json({
                        message: "Region successfully activated"
                    })
                })
                .catch((err) => {
                    res.status(500).json({
                        message: "Fail to activate Region",
                    })
                })
        })
        .catch((err) => {
            res.status(500).json({
                message: err.errors[0].message,
            })
        })
}

exports.deactivate = (req, res) => {
    const id = req.body.id;

    cfg_regions.findOne({
            where: {
                id: id
            }
        })
        .then((data) => {
            data.update({
                    status: false
                })
                .then((data) => {
                    res.status(200).json({
                        message: "Region successfully deactivated"
                    })
                })
                .catch((err) => {
                    res.status(500).json({
                        message: "Fail to deactivate Region",
                    })
                })
        })
        .catch((err) => {
            res.status(500).json({
                message: err.errors[0].message,
            })
        })
}