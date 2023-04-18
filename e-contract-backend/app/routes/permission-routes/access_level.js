const express = require("express");
const router = express.Router();
const {
    authJwt
} = require("../../middleware");
const auth = require("../../controllers/auth/auth");
const profile_controller = require("../../controllers/users/profile");
const level_controller = require("../../controllers/permissions/access_level")

//==========================================================
// ACCESS LEVELS ROUTES
//==========================================================
router.post("/access-levels/add-access-level", [authJwt.verifyToken], level_controller.add);
router.post("/access-levels/edit-access-level", [authJwt.verifyToken], level_controller.edit);
router.get("/access-levels", [authJwt.verifyToken], level_controller.findAll);
router.post("/access-levels/show", [authJwt.verifyToken], level_controller.findOne);
router.post("/access-levels/access-level-activate", [authJwt.verifyToken], level_controller.activate);
router.post("/access-levels/access-level-deactivate", [authJwt.verifyToken], level_controller.deactivate);


module.exports = router;