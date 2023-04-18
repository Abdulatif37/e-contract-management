const express = require("express");
const router = express.Router();
const {
    authJwt
} = require("../../middleware");
const auth = require("../../controllers/auth/auth");
const profile_controller = require("../../controllers/users/profile");
const user_controller = require("../../controllers/users/users");
const role_controller = require("../../controllers/users/role");


//==========================================================
// PROFILES ROUTES
//==========================================================
router.post("/profiles/add-profile", [authJwt.verifyToken], profile_controller.add);
router.post("/profiles/edit-profile", [authJwt.verifyToken], profile_controller.edit);
router.post("/profiles", [authJwt.verifyToken], profile_controller.findAll);
router.post("/profiles/profile/show", [authJwt.verifyToken], profile_controller.findOne);
router.post("/profiles/profile-activate", [authJwt.verifyToken], profile_controller.activate);
router.post("/profiles/profile-deactivate", [authJwt.verifyToken], profile_controller.deactivate);



//==========================================================
// USERS ROUTES
//==========================================================
router.get("/users/roles/show/:id", [authJwt.verifyToken], user_controller.userRoles);
router.post("/users/user/show", [authJwt.verifyToken], user_controller.findOne);



//==========================================================
// ROLES ROUTES
//==========================================================



router.post("/roles/add-role", [authJwt.verifyToken], role_controller.add);
router.post("/roles/edit-role", [authJwt.verifyToken], role_controller.edit);
router.post("/roles", [authJwt.verifyToken], role_controller.findAll);
router.post("/roles/role/show", [authJwt.verifyToken], role_controller.findOne);
router.post("/roles/activate-role", [authJwt.verifyToken], role_controller.activate);
router.post("/roles/deactivate-role", [authJwt.verifyToken], role_controller.deactivate);

module.exports = router;