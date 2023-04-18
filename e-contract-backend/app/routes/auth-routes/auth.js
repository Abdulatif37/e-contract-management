const express = require("express");
const router = express.Router();
const {
    authJwt
} = require("../../middleware");
const controller = require("../../controllers/auth/auth");

// router.get("/", (req, res) => {
//     res.sendFile(__dirname + "/welcome.html");
// });

router.post("/auth/signup", [authJwt.checkUserExistance], controller.signup);
router.post("/auth/signin", [authJwt.checkUserCondition], controller.signin);
router.post("/auth/change-password", controller.changePassword);

// router.post("/auth/activateAccount", controller.ActivateAccount);
// router.post("/auth/user-registration", controller.selfRegister);
// router.post("/auth/self-registration", [authJwt.checkUserExistance], controller.newRegistration);
// router.post("/auth/resetPassword", controller.ResetPassword);
// router.post("/auth/changePassword", controller.ChangePassword);


module.exports = router;