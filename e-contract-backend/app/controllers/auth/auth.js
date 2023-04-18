require('dotenv').config({
    path: './app/.env'
});
const db = require("../../models");
const capitalize = require("../../../node_modules/capitalize-the-first-letter/capitalize");
const pass = require("../../config/password");
const mail = require("../../config/mail");
const uuid = require("uuid");
const tblusers = db.tblusers;
const tbluser_profiles = db.tbluser_profiles;
const tbluser_roles = db.tbluser_roles;
const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
    const firstname = req.body.firstname;
    const middlename = req.body.middlename;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const phone = req.body.phone;
    const profileId = req.body.profileId;
    const roles = req.body.roles;
    const createdBy = req.body.createdBy;
    const registration_date = req.body.registration_date;
    const businessId = req.body.businessId;
    const access_level = req.body.access_level;

    const tempPass = pass.passoword();

    tblusers.create({
            firstname: firstname,
            middlename: middlename,
            lastname: lastname,
            name: capitalize(firstname.toLowerCase()).concat(" ", capitalize(middlename.toLowerCase())).concat(" ", capitalize(lastname.toLowerCase())),
            email: email.toLowerCase(),
            phone: phone,
            password: bcrypt.hashSync(tempPass, 6),
            code: tempPass,
            createdBy: createdBy,
            status: 909,
            registration_date: registration_date,
            accessId: access_level
        })
        .then((user) => {
            tbluser_profiles.create({
                    businessId: businessId,
                    profileId: profileId,
                    userId: user.id,
                })
                .then(() => {
                    for (const key in roles) {
                        const data = roles[key];
                        tbluser_roles.create({
                            roleId: data,
                            userId: user.id,
                        });
                    }
                })
                .then(() => {
                    mail.transport.sendMail(mail.CREATE_USER_Mail(user.email, user.name, tempPass), (error, info) => {
                        if (error) {
                            return res.json({
                                message: "Fail to send email to " + user.email + " but successful registered, Passcode: " + tempPass,
                                password: tempPass,
                            });
                        }
                        return res.json({
                            message: user.name + " successful registered",
                            password: tempPass,
                        });
                    });
                })
                .catch((err) => {
                    res.status(500).json({
                        message: err.errors[0].message,
                    });
                })
        })
        .catch((err) => {
            res.status(500).send({
                message: err.errors[0].message,
            });
        });
};

exports.findAll = (req, res) => {
    tblusers.findAll({
            where: {
                status: {
                    [Op.ne]: 100,
                },
            },
            include: [{
                model: tbluser_profiles
            }],
            order: [
                ["name", "ASC"]
            ],
        })
        .then((data) => {
            res.status(200).json({
                message: "user(s) found",
                data: data
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: "Failed to find user(s)",
            });
        });
};

exports.signin = (req, res) => {
    const password = req.body.password

    tblusers.findOne({
            where: {
                email: req.body.email,
            },
        })
        .then((user) => {
            var passwordIsValid = bcrypt.compareSync(password, user.password);

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!",
                });
            }

            var token = jwt.sign({
                id: user.id
            }, process.env.secret, {
                expiresIn: 3600, // 24 hours : 86400 //  1hr: 3600 // 1min = 60 //5min = 300 // 1hr .5sec = 3630
            });

            if (user && passwordIsValid && token) {
                res.status(200).json({
                    message: "Welcome! " + user.name,
                    id: user.id,
                    name: user.name,
                    accessToken: token,
                    accessId: user.accessId,
                    status: user.status,
                    code: user.password,
                    email: user.email
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: err.errors[0].message,
            });
        });
};

exports.changePassword = (req, res) => {
    const password = req.body.password;
    const code = req.body.code;
    tblusers.findOne({
            where: {
                password: code,
                status: 909,
            },
        })
        .then((result) => {
            result.update({
                    password: bcrypt.hashSync(password, 8),
                    status: 1,
                    code: pass.passoword(),
                })
                .then(() => {
                    res.status(200).send({
                        message: "Password successful changed. Kindly sign in",
                    });
                })
        })
        .catch((err) => {
            res.status(500).json({
                message: "Something went wrong, please try again",
            });
        });
};

exports.forgotPassword = (req, res) => {
    const NewPass = pass.passoword();
    const email = req.body.email;
    const uuidCode = uuid.v4();
    User.findOne({
            where: {
                email: email,
            },
        })
        .then((result) => {
            result.update({
                password: bcrypt.hashSync(NewPass, 8),
                status: 90,
                code: NewPass,
            });
            user_profile
                .findOne({
                    where: {
                        userId: result.id,
                    },
                })
                .then((profile) => {
                    profile.update({
                        status: 90,
                    });
                });
            mail.transport.sendMail(mail.PASSWORD_RESET_Mail(result.email, result.fullname, NewPass), (error, info) => {
                if (error) {
                    return res.json({
                        message: error,
                    });
                }
                return res.json({
                    message: "Check your email to reset password",
                    code: uuidCode,
                });
            });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message,
            });
        });
};

exports.ResetPassword = (req, res) => {
    const NewPass = pass.passoword();
    const id = req.body.id;
    User.findOne({
            where: {
                id: id,
            },
        })
        .then((result) => {
            result.update({
                password: bcrypt.hashSync(NewPass, 8),
                status: 90,
                code: NewPass,
            });
            user_profile
                .findOne({
                    where: {
                        userId: result.id,
                    },
                })
                .then((profile) => {
                    profile.update({
                        status: 90,
                    });
                })
                .then((data) => {
                    mail.transport.sendMail(mail.PASSWORD_RESET_Mail(result.email, result.fullname, NewPass), (error, info) => {
                        if (error) {
                            return res.json({
                                message: "Fail to send email to " + result.email + " but passsword successful reseted",
                                password: NewPass,
                                code: 1,
                            });
                        }
                        return res.json({
                            message: result.fullname + "'s passsword successful reseted",
                            password: NewPass,
                            code: 1,
                        });
                    });
                });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message,
            });
        });
};



exports.ActivateAccount = (req, res) => {
    const uuidCode = uuid.v4();
    const code = req.body.code;
    User.findOne({
            where: {
                code: code,
                status: 909,
            },
        })
        .then((result) => {
            result.update({
                status: 90,
                code: uuidCode,
            });

            user_profile
                .findOne({
                    where: {
                        userId: result.id,
                    },
                })
                .then((profile) => {
                    profile.update({
                        status: 90,
                    });
                })
                .then(() => {
                    res.status(200).send({
                        code: uuidCode,
                    });
                })
                .catch((err) => {
                    res.status(500).send({
                        message: err.errors[0].message,
                    });
                });

            // mail.transport.sendMail(mail.passwordResetMail(result.email, result.fullname, uuidCode), (error, info) => {
            //   if (error) {
            //     return res.json({
            //       message: "Fail to send email but ready for password reset",
            //     });
            //   }
            //   return res.json({
            //     message: "Check your email to reset password",
            //     code: uuidCode,
            //   });
            // });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message,
                code: 101,
            });
        });
};