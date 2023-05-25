const express = require("express");
const app = express()
const controller = require("../controller/controller")
const router = express.Router()
const Middlerware = require("../middleware/auth")

router.route("/login").post(controller.login)
router.route("/signUp").post(controller.RegisterUser);

module.exports = router
