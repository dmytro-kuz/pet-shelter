const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const AdminShema = new Schema({
  login: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Admin = model("Admin", AdminShema);
module.exports = Admin;
