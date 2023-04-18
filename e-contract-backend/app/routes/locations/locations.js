const express = require("express");
const router = express.Router();
const {
    authJwt
} = require("../../middleware");
const region_controller = require("../../controllers/locations/regions");
const district_controller = require("../../controllers/locations/districts");

//==========================================================
// LOCATIONS ROUTES
//==========================================================
router.post("/locations/regions/add-region", [authJwt.verifyToken], region_controller.add);
router.post("/locations/regions/edit-region", [authJwt.verifyToken], region_controller.edit);
router.get("/locations/regions", [authJwt.verifyToken], region_controller.findAll);
router.post("/locations/regions/show", [authJwt.verifyToken], region_controller.findOne);
router.post("/locations/regions/activate-region", [authJwt.verifyToken], region_controller.activate);
router.post("/locations/regions/deactivate-region", [authJwt.verifyToken], region_controller.deactivate);


router.post("/locations/districts/add-district", [authJwt.verifyToken], district_controller.add);
router.post("/locations/districts/edit-district", [authJwt.verifyToken], district_controller.edit);
router.get("/locations/districts", [authJwt.verifyToken], district_controller.findAll);
router.post("/locations/districts/show", [authJwt.verifyToken], district_controller.findOne);
router.post("/locations/districts/activate-district", [authJwt.verifyToken], district_controller.activate);
router.post("/locations/districts/deactivate-district", [authJwt.verifyToken], district_controller.deactivate);
router.post("/locations/districts/transfer-district", [authJwt.verifyToken], district_controller.transfer);

module.exports = router;