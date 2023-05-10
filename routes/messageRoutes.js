const express = require("express");
const messageController = require("./../controller/messageController");

const router = express.Router();

router
  .route("/")
  .get(messageController.getAllmessages)
  .post(messageController.addAmessage);

router.route("/:id").get(messageController.getAmessage);

module.exports = router;
