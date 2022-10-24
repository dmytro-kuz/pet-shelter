const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const NeedCountSchema = new Schema({
  type: { type: String, required: true },
  count: { type: Number },
});
const NeedCount = model("NeedCount", NeedCountSchema);
module.exports = NeedCount;
