const express = require("express");
const viewsController = require("./../controller/viewsController");
const authController = require("./../controller/authController");
const router = express.Router();

router.get("/", viewsController.getOverview);
router.get("/chat", viewsController.chat);
router.get("/login", viewsController.login);
router.get("/signup", viewsController.signup);
router.get("/user/login", authController.login);

router.get("/user/signup", authController.signup);

module.exports = router;
