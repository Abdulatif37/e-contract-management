const express = require("express");
const router = express.Router();
const {
    authJwt
} = require("../../middleware");
const controller = require("../../controllers/users/business_name");
const category_controller = require("../../controllers/users/business_category");


//==========================================================
// BUSINESS ROUTES
//==========================================================
router.post("/business-names/add-business-name", [authJwt.verifyToken], controller.add);
router.post("/business-names/edit-business-name", [authJwt.verifyToken], controller.edit);
router.get("/business-names", [authJwt.verifyToken], controller.findAll);
router.post("/business-names/business-name/show", [authJwt.verifyToken], controller.findOne);
router.post("/business-names/activate-business-name", [authJwt.verifyToken], controller.activate);
router.post("/business-names/deactivate-business-name", [authJwt.verifyToken], controller.deactivate);

router.post("/business-categories/add-business-category", [authJwt.verifyToken], category_controller.add);
router.post("/business-categories/edit-business-category", [authJwt.verifyToken], category_controller.edit);
router.get("/business-categories", [authJwt.verifyToken], category_controller.findAll);
router.post("/business-categories/business-category/show", [authJwt.verifyToken], category_controller.findOne);
router.post("/business-categories/activate-business-category", [authJwt.verifyToken], category_controller.activate);
router.post("/business-categories/deactivate-business-category", [authJwt.verifyToken], category_controller.deactivate);


module.exports = router;