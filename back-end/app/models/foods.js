const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const FoodSchema = new Schema({
  type: { type: String, required: true },
  name: { type: String, required: true },
  number: { type: Number },
});
const Food = model("Food", FoodSchema);
module.exports = Food;
