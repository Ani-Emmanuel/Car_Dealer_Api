const User = require("../models/user");
const Car = require("../models/car");
module.exports = {
  index: async (req, res, next) => {
    try {
      const users = await User.find({});
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  },

  newUser: async (req, res, next) => {
    try {
      const newUser = new User(req.body);
      const user = await newUser.save();
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  },

  getUser: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const user = await User.findById(userId);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  },

  replaceUser: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const body = req.body;
      const user = await User.findByIdAndUpdate(userId, body);
      res.status(200).json({ payload: { message: "success" } });
    } catch (error) {
      next(error);
    }
  },

  updateUser: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const body = req.body;
      await User.findByIdAndUpdate(userId, body);
      res.status(200).json({ payload: { message: "success" } });
    } catch (error) {
      next(error);
    }
  },

  getUserCars: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const userCars = await User.findById(userId).populate("cars");
      res.status(200).json(userCars.cars);
    } catch (error) {
      next(error);
    }
  },

  newUserCar: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const newUserCar = new Car(req.body);
      const user = await User.findById(userId);
      newUserCar.seller = user._id;
      await newUserCar.save();
      user.cars.push(newUserCar);
      await user.save();
      res.status(201).json(newUserCar);
    } catch (error) {
      next(error);
    }
  }
};
