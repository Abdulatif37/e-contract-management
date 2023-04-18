require('dotenv').config({
    path: './app/.env'
});
const db = require("../../models");
const capitalize = require("../../../node_modules/capitalize-the-first-letter");
const appModule = db.cfg_modules;
const appSubModule = db.cfg_sub_modules;
const appRoles = db.cfg_roles;
const cfg_module = db.cfg_module_permission;
const Op = db.Sequelize.Op;

exports.add = (req, res) => {
    const name = req.body.name;
    const icon = req.body.icon;
    const module = capitalize(name.toLowerCase());
    appModule.create({
            name: name,
            icon: icon,
            linkName: module.split(" ").join(""),
            status: 1
        })
        .then((module) => {
            appRoles.findAll()
                .then((roles) => {
                    for (const key in roles) {
                        cfg_module.create({
                                permission: 'false',
                                moduleId: module.id,
                                roleId: roles[key].id
                            })
                            .catch((err) => {
                                res.status(500)
                                    .send({
                                        message: err.errors[0].message,
                                    });
                            })
                    }
                })
                .then((result) => {
                    res.status(200).send({
                        message: module.name + ' Successfull created'
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
                .send({
                    message: err.errors[0].message,
                });
        })
}

exports.findAll = (req, res) => {
    appModule.findAll({
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

    appModule.findByPk(id)
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((err) => {
            res.status(500).send({
                massage: err,
            })
        })
}

exports.edit = (req, res) => {
    const id = req.params.id;
    const name = req.body.name;
    const icon = req.body.icon;
    const module = capitalize(name.toLowerCase());

    appModule.findByPk(id)
        .then((data) => {
            data.update({
                    name: name,
                    icon: icon,
                    linkName: module.split(" ").join("")
                })
                .then((result) => {
                    res.status(200).send({
                        message: 'Successful updated'
                    })
                })
                .catch((err) => {
                    res.status(500).send({
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
    appModule.findOne({
            where: {
                id: id
            }
        })
        .then((result) => {
            result.update({
                status: true
            });
            res.status(200).send({
                message: result.name + ' Successful activated'
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
    appModule.findByPk(id)
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

exports.submodules = (req, res) => {
    const moduleId = req.params.id;
    appSubModule.findAll({
            where: {
                moduleId: moduleId
            },
            order: [
                ['name', 'ASC'],
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

}