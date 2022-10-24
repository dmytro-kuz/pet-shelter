const mongoose = require("mongoose");
const incVersion = require("../_helpers/incVersion");
const { model, Schema } = mongoose;

const PetSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      match: [/[А-ЯҐЄІЇA-Z][а-яґєіїa-z]+$/, "Name is not valid"],
    },
    type: {
      type: String,
      required: true,
      enum: ["Собака", "Кіт"],
    },
    breed: {
      type: String,
    },
    sex: {
      type: String,
      required: true,
      enum: ["Він", "Вона"],
    },
    birthDate: {
      type: Date,
      required: true,
    },
    size: {
      type: String,
      required: true,
      enum: ["Малий", "Середній", "Великий"],
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      required: true,
      enum: ["Живий", "Прилаштований", "Мертвий"],
    },
    overstayDates: {
      type: Array,
      required: true,
    },
    photos: {
      type: Array,
    },
  },
  { timestamps: true },
  { optimisticConcurrency: true }
);
incVersion({ schema: PetSchema, method: "findOneAndUpdate" });
const Pet = model("Pet", PetSchema);
module.exports = Pet;
