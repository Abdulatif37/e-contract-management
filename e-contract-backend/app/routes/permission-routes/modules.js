const express = require('express');
const router = express.Router();
const {
    authJwt
} = require("../../middleware");
const controller = require("../../controllers/permissions/modules");

// router.get("/", (req, res) => {
//     res.sendFile(__dirname + "/welcome.html");
// });
//[authJwt.checkUserExistance],

router.post("/module/add-module", [authJwt.verifyToken], controller.add);
router.get("/module/modules", [authJwt.verifyToken], controller.findAll);
router.get("/module/module/show/:id", [authJwt.verifyToken], controller.findOne);
router.post("/module/edit-module/:id", [authJwt.verifyToken], controller.edit);
router.post("/module/activate-module", [authJwt.verifyToken], controller.activate);
router.post("/module/deactivate-module", [authJwt.verifyToken], controller.deactivate);
router.get("/module/module-submodule/:id", [authJwt.verifyToken], controller.submodules);


module.exports = router;