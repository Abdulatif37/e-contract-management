const jwt = require("jsonwebtoken");
require('dotenv').config({
    path: './app/.env'
});
const db = require("../models");
const tblusers = db.tblusers;
const ap_users = db.api_users;


//================================================================
// CHECK USER IF EXIST
//================================================================
(checkUserExistance = (req, res, next) => {
    tblusers.findOne({
            where: {
                email: req.body.email,
            },
        })
        .then((user) => {
            if (user) {
                res.status(402).send({
                    message: "User account already exist",
                });
                return;
            }

            next();
        })
        .catch((err) => {
            res.status(500).send({
                message: err.errors[0].message,
            });
        });
}),



//================================================================
// CHECK USER CONDITION
//================================================================
(checkUserCondition = (req, res, next) => {
    const password = req.body.password

    tblusers.findOne({
            where: {
                email: req.body.email,
            },
        })
        .then((user) => {
            if (!user) {
                return res.status(404).send({
                    message: "User not registered..!",
                });
            }

            // if (user.status == 909) {
            //     return res.status(404).send({
            //         message: "Account not activated/check your email..!",
            //         code: 909,
            //     });
            // }

            if (user.status == 100) {
                return res.status(404).send({
                    message: "No Account Found, Contact System Administrator",
                    code: 100,
                });
            }

            if (user.status == 2) {
                return res.status(404).send({
                    message: "Account Deactivated, Contact System Administrator",
                    code: 2,
                });
            }

            next();
        })
        .catch((err) => {
            res.status(500).json({
                message: err,
            });
        });
}),




//================================================================
// VERIFY TOKEN
//================================================================
(verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({
            message: "No token provided",
        });
    }

    jwt.verify(token, process.env.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unathorized..!",
                token: 0,
            });
        }
        req.userId = decoded.id;
        next();
    });
});


//================================================================
// CHECK THIRD PART USER IF EXIST
//================================================================
apiUserExistance = (req, res, next) => {

    ap_users
        .findOne({
            where: {
                name: req.body.name,
            },
        })
        .then((user) => {
            if (user) {
                res.status(401).send({
                    message: "User already exist",
                    code: 0,
                });
                return;
            }

            next();
        })
        .catch((err) => {
            res.status(500).send({
                message: err,
            });
        });
};

const auth = {
    checkUserExistance: checkUserExistance,
    checkUserCondition: checkUserCondition,
    verifyToken: verifyToken,
    apiUserExistance: apiUserExistance,
};
module.exports = auth;