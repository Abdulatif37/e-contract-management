require('dotenv').config({
    path: './app/.env'
});
const db = require("../../models");
const capitalize = require("../../../node_modules/capitalize-the-first-letter");
const appSubModule = db.cfg_sub_modules;
const appAction = db.cfg_sub_module_action;
const appRoles = db.cfg_roles;
const cfg_sub_modules = db.cfg_sub_module_permission;
const Op = db.Sequelize.Op;

exports.add = (req, res) => {
    const name = req.body.name;
    const link = req.body.link;
    const icon = req.body.icon;
    const id = req.params.id;

    appSubModule
        .create({
            name: name,
            link: link,
            icon: icon,
            moduleId: id,
            linkName: capitalize(name.toLowerCase()).split(" ").join(""),
            status: 1,
        })
        .then((submodule) => {
            appRoles
                .findAll()
                .then((roles) => {
                    for (const key in roles) {
                        cfg_sub_modules
                            .create({
                                permission: "false",
                                sub_moduleId: submodule.id,
                                moduleId: id,
                                roleId: roles[key].id,
                            })
                            .catch((err) => {
                                res.status(500).send({
                                    message: err.errors[0].message,
                                });
                            });
                    }
                })
                .then((result) => {
                    res.status(200).send({
                        message: submodule.name + " Successfull created",
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

exports.findAll = (req, res) => {
    appSubModule
        .findAll({
            order: [
                ["name", "ASC"]
            ],
        })
        .then((data) => {
            res.status(200).send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: "Something went wrong, kindly try again later" + err,
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    appSubModule
        .findByPk(id)
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((err) => {
            res.status(500).send({
                message: "Something went wrong, kindly try again later",
            });
        });
};

exports.edit = (req, res) => {
    const id = req.params.id;
    const name = req.body.name;
    const icon = req.body.icon;
    const link = req.body.link;

    appSubModule
        .findByPk(id)
        .then((data) => {
            data
                .update({
                    name: name,
                    icon: icon,
                    link: link,
                    linkName: capitalize(name.toLowerCase()).split(" ").join(""),
                    moduleId: data.moduleId,
                })
                .then((result) => {
                    res.status(200).send({
                        message: "Successful updated",
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
                message: err.message,
            });
        });
};

exports.activate = (req, res) => {
    const id = req.body.id;
    appSubModule
        .findByPk(id)
        .then((data) => {
            data.update({
                status: true,
            });

            res.status(200).send({
                message: data.name + " Successful activated",
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
    appSubModule
        .findByPk(id)
        .then((data) => {
            data.update({
                status: false,
            });

            res.status(200).send({
                message: data.name + " Successful deactivated",
            });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.errors[0].message,
            });
        });
};

exports.submoduleAction = (req, res) => {
    const sub_moduleId = req.params.id;
    appAction
        .findAll({
            where: {
                sub_moduleId: sub_moduleId,
            },
            order: [
                ["name", "ASC"]
            ],
        })
        .then((data) => {
            res.status(200).send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.errors[0].message,
            });
        });
};