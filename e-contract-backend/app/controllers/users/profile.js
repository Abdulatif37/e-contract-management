require('dotenv').config({
    path: './app/.env'
});
const db = require("../../models");
const capitalize = require("capitalize-the-first-letter");
const cfg_access_level = db.cfg_access_level;
const cfg_profiles = db.cfg_profiles;
const tbluser_profiles = db.tbluser_profiles;
const tblbusiness_name = db.tblbusiness_name;
const tblusers = db.tblusers;
const Op = db.Sequelize.Op;


exports.add = (req, res) => {
    const userId = req.body.userId;
    const name = req.body.name;
    const accessId = req.body.accessId;
    const businessId = req.body.businessId;

    tblusers.findOne({
            where: {
                id: userId
            }
        })
        .then((data) => {
            if (data.accessId == '1') {
                cfg_profiles.create({
                        name: name,
                        accessId: accessId,
                        status: true,
                        businessId: businessId
                    })
                    .then(() => {
                        res.status(200).json({
                            message: "Profile successful added"
                        });
                    })
                    .catch((err) => {
                        res.status(500).json({
                            message: "Fail to add profile"
                        });
                    })
            }

            if (data.accessId > '1') {
                cfg_profiles.create({
                        name: name,
                        accessId: accessId,
                        status: true,
                        businessId: data.tbluser_profile.businessId
                    })
                    .then((result) => {
                        res.status(200).json({
                            message: "Profile successful added"
                        });
                    })
                    .catch((err) => {
                        res.status(500).json({
                            message: "Fail to add profile"
                        });
                    })
            }
        })
        .catch((err) => {
            res.status(500).json({
                message: err.errors[0].message,
            });
        })


}

exports.edit = (req, res) => {
    const id = req.body.id;
    const userId = req.body.userId;
    const name = req.body.name;
    const access_level = req.body.access_level;
    const businessId = req.body.businessId;

    cfg_profiles.findOne({
            where: {
                id: id
            }
        })
        .then((result) => {
            result.update({
                name: name,
                accessId: access_level,
                businessId: businessId
            });

            res.status(200).json({
                message: "Profile successful updated"
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: err.errors[0].message,
            });
        })
}

exports.findOne = (req, res) => {
    const id = req.body.id;

    cfg_profiles.findOne({
            where: {
                id: id
            },
            include: [{
                    model: cfg_access_level
                },
                {
                    model: tblbusiness_name
                }

            ]
        })
        .then((data) => {
            res.status(200).json({
                message: "Profile(s) found",
                data: data
            })
        })
        .catch((err) => {
            res.status(500).json({
                message: "Profile(s) not found"
            });
        })
};

exports.findAll = (req, res) => {
    const id = req.body.id;

    tbluser_profiles.findOne({
            where: {
                userId: id
            }
        })
        .then((data) => {
            cfg_profiles.findAll({
                    where: {
                        businessId: data.businessId
                    },
                    include: [{
                            model: cfg_access_level
                        },
                        {
                            model: tblbusiness_name
                        }
                    ],
                    order: [
                        ['name', 'ASC'],
                    ],

                })
                .then((data) => {
                    res.status(200).json({
                        message: "Profile(s) found",
                        profile: data
                    });
                })
                .catch((err) => {
                    res.status(500).json({
                        message: "Profile(s) not found"
                    });
                });
        })
        .catch((err) => {
            res.status(500).json({
                message: "User haven't assigend to any business"
            });
        });


}

exports.activate = (req, res) => {
    const id = req.body.id;

    cfg_profiles.findOne({
            where: {
                id: id
            }
        })
        .then((data) => {
            data.update({
                status: true
            });

            res.status(200).json({
                message: 'Profile successful activated'
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

    cfg_profiles.findOne({
            where: {
                id: id
            }
        })
        .then((data) => {
            data.update({
                status: false
            });

            res.status(200).send({
                message: 'Profile successful deactivated'
            });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.errors[0].message,
            });
        })
}