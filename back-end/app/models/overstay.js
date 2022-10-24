const mongoose = require("mongoose");
const incVersion = require("../_helpers/incVersion");
const { model, Schema } = mongoose;

const OverstaySchema = new Schema(
  {
    pet_id: {
      type: String,
      required: true,
      match: [/^[0-9a-fA-F]{24}$/, "Pet ID is not valid"],
    },
    clientName: {
      type: String,
      required: true,
      match: [/[А-ЯҐЄІЇA-Z][а-яґєіїa-z]+$/, "Name is not valid"],
    },
    clientEmail: {
      type: String,
      required: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Email address is not valid"],
    },
    clientPhone: {
      type: String,
      required: true,
      minLength: 16,
      maxLength: 16,
    },
    clientInformation: {
      type: String,
      required: true,
      minLength: 10,
    },
    overstayDates: {
      type: Array,
      required: true,
    },
    overstayStatus: {
      type: String,
      required: true,
      enum: ["в обробці", "підтверджено", "прилаштовано"],
    },
  },
  { timestamps: true },
  { optimisticConcurrency: true }
);

incVersion({ schema: OverstaySchema, method: "findOneAndUpdate" });

const Overstay = model("Overstay", OverstaySchema);
module.exports = Overstay;
