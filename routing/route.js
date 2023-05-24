const express = require("express");
const app = express()
const controller = require("../controller/controller")
const router = express.Router()

router.route("/login").post(controller.login)

module.exports = router
