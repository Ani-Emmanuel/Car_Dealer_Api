const Car = require("../models/car");
const User = require("../models/user");

module.exports = {
  index: async (req, res, next) => {
    try {
      const car = await Car.find({});
      res.status(200).json(car);
    } catch (err) {
      next(err);
    }
  },

  newCar: async (req, res, next) => {
    try {
      const data = req.body;
      const seller = await User.findById(data.seller);
      delete data.seller;
      const car = new Car(data);
      seller.cars.push(car);
      await seller.save();
      car.seller = seller._id;
      await car.save();
      res.status(201).json({ success: true });
    } catch (error) {
      next(error);
    }
  },

  getcar: async (req, res, next) => {
    try {
      const { carId } = req.params;
      const car = await Car.findById(carId);
      res.status(200).json(car);
    } catch (error) {
      next(error);
    }
  },

  replaceCar: async (req, res, next) => {
    try {
      const { carId } = req.params;
      const data = req.body;
      await Car.findByIdAndUpdate(carId, data);
      res.status(201).json({ success: true });
    } catch (error) {
      next(error);
    }
  },

  updateCar: async (req, res, next) => {
    try {
      const { carId } = req.params;
      const data = req.body;
      await Car.findByIdAndUpdate(carId, data);
      res.status(201).json({ success: true });
    } catch (error) {
      next(error);
    }
  },

  deleteCar: async (req, res, next) => {
    try {
      const { carId } = req.params;
      const car = await Car.findById(carId);
      if (!car)
        return res.status(404).json({ error: "sorry car does not exit" });
      await car.remove();
      const user = await User.findById(car.seller);
      user.cars.pull(car);
      await user.save();
    } catch (error) {
      next(error);
    }
  }
};
