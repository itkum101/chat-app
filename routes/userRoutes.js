const express = require("express");
const userController = require("./../controller/userController");

const router = express.Router();

router.route("/").get(userController.getAllUsers).post(userController.addAUser);

router
  .route("/:id")
  .get(userController.getAUser)
  .delete(userController.deleteAUser);

module.exports = router;
