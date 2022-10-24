const Admin = require("../models/admin");

//return object with login and pasword from db
const checkAccess = async (authParams) => {
  return await Admin.findOne({
    login: authParams.login,
    password: authParams.password,
  });
};

module.exports = {
  checkAccess,
};
