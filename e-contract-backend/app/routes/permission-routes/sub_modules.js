const express = require('express');
const router = express.Router();
const {
    authJwt
} = require("../../middleware");
const controller = require("../../controllers/permissions/sub_module");

// router.get("/", (req, res) => {
//     res.sendFile(__dirname + "/welcome.html");
// });
//[authJwt.checkUserExistance],

router.post("/submodule/add-submodule/:id", [authJwt.verifyToken], controller.add);
router.get("/submodule/submodules", [authJwt.verifyToken], controller.findAll);
router.get("/submodule/submodule/show/:id", [authJwt.verifyToken], controller.findOne);
router.post("/submodule/edit-submodule/:id", [authJwt.verifyToken], controller.edit);
router.post("/submodule/activate-submodule", [authJwt.verifyToken], controller.activate);
router.post("/submodule/deactivate-submodule", [authJwt.verifyToken], controller.deactivate);
router.get("/submodule/submodule-action/:id", [authJwt.verifyToken], controller.submoduleAction);

module.exports = router;