const express = require('express');
const router = express.Router();
const {
    authJwt
} = require("../../middleware");
const controller = require("../../controllers/permissions/role_permission");

// router.get("/", (req, res) => {
//     res.sendFile(__dirname + "/welcome.html");
// });
//[authJwt.verifyToken],,

router.get("/permission/permissions", [authJwt.verifyToken], controller.permissions);
router.get("/permission/role-permission/:id", [authJwt.verifyToken], controller.rolePermissions);
router.post("/permission/update-permission", [authJwt.verifyToken], controller.updatePermissions);
router.post("/permission/show-module-permission", [authJwt.verifyToken], controller.showModulePermissions);
router.post("/permission/show-submodule-permission", [authJwt.verifyToken], controller.showSubPermissions);
router.post("/permission/show-action-permission", [authJwt.verifyToken], controller.showActionPermissions);

module.exports = router;