const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const NewsSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    photos: {
      type: Array,
    },
  },
  { 
    timestamps: true 
  }, 
  {
    collection: 'news',
  },
);

const News = model("News", NewsSchema);
module.exports = News;
