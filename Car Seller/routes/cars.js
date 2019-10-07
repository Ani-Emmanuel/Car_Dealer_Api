const express = require("express");
const Router = express.Router();
const carsController = require("../controller/cars");

Router.route("/")
  .get(carsController.index)
  .post(carsController.newCar);

Router.route("/:carId")
  .get(carsController.getcar)
  .put(carsController.replaceCar)
  .patch(carsController.updateCar)
  .delete(carsController.deleteCar);

module.exports = Router;
