const express = require("express");
const Router = express.Router();
const userController = require("../controller/users");

Router.route("/")
  .get(userController.index)
  .post(userController.newUser);

Router.route("/:userId")
  .get(userController.getUser)
  .put(userController.replaceUser)
  .patch(userController.updateUser);

Router.route("/:userId/cars")
  .get(userController.getUserCars)
  .post(userController.newUserCar);
module.exports = Router;
