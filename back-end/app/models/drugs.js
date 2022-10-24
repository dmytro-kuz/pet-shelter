const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const DrugsSchema = new Schema({
  name: { type: String, required: true },
  number: { type: Number },
  status: { type: String, require: true },
});
const Drugs = model("Drugs", DrugsSchema);
module.exports = Drugs;
