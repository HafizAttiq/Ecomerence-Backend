const express = require("express");
const app = express()
const controller = require("../controller/controller")
const router = express.Router()
const Middlerware = require("../middleware/auth")
const multer = require('multer');
const upload = multer();

router.route("/login").post(controller.login)
router.route("/signUp").post(controller.RegisterUser);
router.post('/upload', upload.single('image'), controller.imageUpload);
router.post('/uploadimg' , upload.single('image'), controller.mainbannerimg);
module.exports = router
