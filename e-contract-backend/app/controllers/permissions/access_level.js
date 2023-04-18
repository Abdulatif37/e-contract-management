require('dotenv').config({
    path: './app/.env'
});
const db = require("../../models");
const capitalize = require("capitalize-the-first-letter");
const cfg_access_level = db.cfg_access_level;
const Op = db.Sequelize.Op;

exports.add = (req, res) => {
    const name = req.body.name;
    const access_level = req.body.access_level;

    cfg_access_level.create({
            name: name,
            accessId: access_level,
            status: true,
        })
        .then(() => {
            res.status(200).json({
                message: "Access level successfully added"
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
    const access_level = req.body.access_level;

    cfg_access_level.findOne({
            where: {
                id: id
            }
        })
        .then((data) => {
            data.update({
                name: name,
                accessId: access_level,
            })
        })
        .then(() => {
            res.status(200).json({
                message: "Access level successfully updated"
            })
        })
        .catch((err) => {
            res.status(500).json({
                message: err.errors[0].message,
            })
        })
}

exports.findAll = (req, res) => {
    cfg_access_level.findAll()
        .then((data) => {
            res.status(200).json({
                message: "Access level successfully found",
                level: data
            })
        })
        .catch((err) => {
            res.status(500).json({
                message: "No access level found",
            })
        })

}

exports.findOne = (req, res) => {
    const id = req.body.id;

    cfg_access_level.findOne({
            where: {
                id: id
            }
        })
        .then((data) => {
            res.status(200).json({
                message: "Access level successfully found",
                level: data
            })
        })
        .catch((err) => {
            res.status(500).json({
                message: "No access level found",
            })
        })
}

exports.activate = (req, res) => {
    const id = req.body.id;

    cfg_access_level.findOne({
            where: {
                id: id
            }
        })
        .then((data) => {
            data.update({
                status: true
            });

            res.status(200).json({
                message: 'Access level successful activated'
            });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.errors[0].message,
            });
        })
}

exports.deactivate = (req, res) => {
    const id = req.body.id;

    cfg_access_level.findOne({
            where: {
                id: id
            }
        })
        .then((data) => {
            data.update({
                status: false
            });

            res.status(200).json({
                message: 'Access level successful deactivated'
            });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.errors[0].message,
            });
        })
}