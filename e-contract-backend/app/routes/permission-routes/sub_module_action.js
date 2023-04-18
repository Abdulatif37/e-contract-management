const express = require('express');
const router = express.Router();
const {
    authJwt
} = require("../../middleware");
const controller = require("../../controllers/permissions/sub_module_action");

// router.get("/", (req, res) => {
//     res.sendFile(__dirname + "/welcome.html");
// });
//[authJwt.verifyToken],

router.post("/submodule-action/add-action", [authJwt.verifyToken], controller.add);
router.get("/submodule-action/submodule-actions", [authJwt.verifyToken], controller.findAll);
router.get("/submodule-action/submodule-action/show/:id", [authJwt.verifyToken], controller.findOne);
router.post("/submodule-action/edit-action/:id", [authJwt.verifyToken], controller.edit);
router.post("/submodule-action/activate-action", [authJwt.verifyToken], controller.activate);
router.post("/submodule-action/deactivate-action", [authJwt.verifyToken], controller.deactivate);

module.exports = router;