const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstname: String,
  lastname: String,
  email: String,
  cars: [
    {
      type: Schema.Types.ObjectId,
      ref: "car"
    }
  ]
});

const User = mongoose.model("user", userSchema);

module.exports = User;
