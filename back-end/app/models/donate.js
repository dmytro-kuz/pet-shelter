const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const DonateSchema = new Schema({
  status: {
    type: String,
    minLength: 2,
    maxLength: 15,
  },
  amount: {
    type: Number,
  },
  createDate: {
    type: Date,
  },
  errDescription: {
    type: String,
    minLength: 2,
    maxLength: 35,
  },
  viewed: {
    type: Boolean,
  },
});

const Donate = model("Donate", DonateSchema);
module.exports = Donate;
