const express = require("express");
const router = express.Router();
const {
    authJwt
} = require("../../middleware");
const auth = require("../../controllers/auth/auth");
const controller = require("../../controllers/users/section");

//==========================================================
// SECTIONS ROUTES
//==========================================================
router.post("/sections/add-section", [authJwt.verifyToken], controller.add);
router.post("/sections/edit-section", [authJwt.verifyToken], controller.edit);
router.post("/sections", [authJwt.verifyToken], controller.findAll);
router.post("/sections/section/show", [authJwt.verifyToken], controller.findOne);
router.post("/sections/section-activate", [authJwt.verifyToken], controller.activate);
router.post("/sections/section-deactivate", [authJwt.verifyToken], controller.deactivate);


module.exports = router;