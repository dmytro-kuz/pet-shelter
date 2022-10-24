const authDataService = require("../data/auth");
const jwt = require("jsonwebtoken");

// return tokens if authentication is valid
const getTokens = async (authParams) => {
  const access = await authDataService.checkAccess(authParams);
  if (access) {
    return { accessToken: accessToken(access) };
  } else {
    return null;
  }
};

module.exports = {
  getTokens,
};

function accessToken(params) {
  const user = { name: params.login };
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "99H",
  }); // token active time

  return accessToken;
}
