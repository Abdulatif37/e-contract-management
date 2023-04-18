require('dotenv').config({
    path: './app/.env'
});
const db = require("../../models");
const capitalize = require("../../../node_modules/capitalize-the-first-letter");
const appAction = db.cfg_sub_module_action;
const appSubModule = db.cfg_sub_modules;
const appRoles = db.cfg_roles;
const cfg_sub_module_action = db.cfg_action_permission;
const Op = db.Sequelize.Op;

exports.add = (req, res) => {
    const name = req.body.name;
    const sub_moduleId = req.body.sub_moduleId;


    appSubModule.findOne({
            where: {
                id: sub_moduleId
            }
        })
        .then((data) => {
            appAction.create({
                    name: name.toLowerCase(),
                    moduleId: data.moduleId,
                    sub_moduleId: sub_moduleId,
                    status: 1
                })
                .then((action) => {
                    appRoles.findAll()
                        .then((roles) => {
                            for (const key in roles) {
                                cfg_sub_module_action.create({
                                    permission: false,
                                    actionId: action.id,
                                    sub_moduleId: sub_moduleId,
                                    moduleId: data.moduleId,
                                    roleId: roles[key].id
                                })

                            }
                        })
                        .then((result) => {
                            res.status(200).send({
                                message: 'Action successfull created'
                            })
                        })
                        .catch((err) => {
                            res.status(500)
                                .send({
                                    message: err.errors[0].message,
                                });
                        })
                })
                .catch((err) => {
                    res.status(500)
                        .json({
                            message: "Submodule not found",
                        });
                })
        })
        .catch((err) => {
            res.status(500)
                .json({
                    message: err.errors[0].message,
                });
        })

}

exports.findAll = (req, res) => {
    appAction.findAll({
            order: [
                ['name', 'ASC'],
            ],
        })
        .then((data) => {
            res.status(200).send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message,
            });
        });
}

exports.findOne = (req, res) => {
    const id = req.params.id;

    appAction.findByPk(id)
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((err) => {
            res.status(500).send({
                massage: err.message,
            })
        })
}

exports.edit = (req, res) => {
    const id = req.params.id;
    const name = req.body.name;

    appAction.findByPk(id)
        .then((data) => {
            data.update({
                    name: name.toLowerCase(),
                })
                .then((result) => {
                    res.status(200).send({
                        message: 'Successful updated'
                    })
                })
                .catch((err) => {
                    res.status(500)
                        .send({
                            message: err.errors[0].message,
                        });
                });
        })
        .catch((err) => {
            res.status(500)
                .send({
                    message: err.errors[0].message,
                });
        });

}

exports.activate = (req, res) => {
    const id = req.body.id;
    appAction.findByPk(id)
        .then((data) => {
            data.update({
                status: true
            });

            res.status(200).send({
                message: data.name + ' Successful activated'
            })
        })
        .catch((err) => {
            res.status(500)
                .send({
                    message: err.errors[0].message,
                });
        })
}

exports.deactivate = (req, res) => {
    const id = req.body.id;
    appAction.findByPk(id)
        .then((data) => {
            data.update({
                status: false
            });
            res.status(200).send({
                message: data.name + ' Successful deactivated'
            })
        })
        .catch((err) => {
            res.status(500)
                .send({
                    message: err.errors[0].message,
                });
        })
}