const express = require("express");
const app = express()
const controller = require("../controller/controller")
const adminController = require("../controller/adminLogin")
const router = express.Router()
const Middlerware = require("../middleware/auth")

router.route("/login").post(controller.login)
router.route("/signUp").post(controller.RegisterUser);
router.route("/adminLogin").post(adminController.adminLogin);
router.route("/adminRegister").post(adminController.adminRegister);
module.exports = router
