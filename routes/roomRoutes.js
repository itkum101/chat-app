const express = require("express");
const roomController = require("./../controller/roomController");

const router = express.Router();

router.route("/").get(roomController.getAllRoom).post(roomController.addARoom);

module.exports = router;
