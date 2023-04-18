require('dotenv').config({
    path: './app/.env'
});
const db = require("../../models");
const capitalize = require("capitalize-the-first-letter");
const cfg_districts = db.cfg_districts;
const cfg_regions = db.cfg_regions;
const Op = db.Sequelize.Op;

exports.add = (req, res) => {
    const name = req.body.name;
    const regionId = req.body.regionId;

    cfg_districts.create({
            name: name,
            regionId: regionId,
            status: true
        })
        .then((data) => {
            res.status(200).json({
                message: "District successfully added"
            })
        })
        .catch((err) => {
            res.status(500).json({
                message: err,
            })
        })
}

exports.edit = (req, res) => {

    const id = req.body.id;
    const name = req.body.name;
    const regionId = req.body.regionId;

    cfg_districts.findOne({
            where: {
                id: id,
                regionId: regionId
            }
        })
        .then((data) => {
            data.update({
                    name: name
                })
                .then((data) => {
                    res.status(200).json({
                        message: "District successfully updated"
                    })
                })
                .catch((err) => {
                    res.status(500).json({
                        message: "Fail to update District",
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

    cfg_districts.findAll({
            include: [{
                model: cfg_regions
            }],
            order: [
                ['name', 'ASC'],
            ],
        })
        .then((data) => {
            res.status(200).json({
                message: "District(s) found",
                data: data
            })
        })
        .catch((err) => {
            res.status(500).json({
                message: " No District(s) found"
            })
        })
}

exports.findOne = (req, res) => {
    const id = req.body.id;
    cfg_districts.findOne({
            where: {
                id: id
            },
            include: [{
                model: cfg_regions
            }],
        })
        .then((data) => {
            res.status(200).json({
                message: "District found",
                data: data
            })
        })
        .catch((err) => {
            res.status(500).json({
                message: " No District found"
            })
        })
}

exports.activate = (req, res) => {
    const id = req.body.id;

    cfg_districts.findOne({
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
                        message: "District successfully activated"
                    })
                })
                .catch((err) => {
                    res.status(500).json({
                        message: "Fail to activate District",
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

    cfg_districts.findOne({
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
                        message: "District successfully deactivated"
                    })
                })
                .catch((err) => {
                    res.status(500).json({
                        message: "Fail to deactivate District",
                    })
                })
        })
        .catch((err) => {
            res.status(500).json({
                message: err.errors[0].message,
            })
        })
}

exports.transfer = (req, res) => {
    const id = req.body.id;
    const regionId = req.body.regionId;

    cfg_districts.findOne({
            where: {
                id: id
            }
        })
        .then((data) => {
            data.update({
                    regionId: regionId
                })
                .then((data) => {
                    res.status(200).json({
                        message: "District successfully transferred"
                    })
                })
                .catch((err) => {
                    res.status(500).json({
                        message: "Fail to transferred District",
                    })
                })
        })
        .catch((err) => {
            res.status(500).json({
                message: err.errors[0].message,
            })
        })
}