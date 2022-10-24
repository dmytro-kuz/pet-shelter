const jwt = require("jsonwebtoken");

const checkAccess = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null || undefined) {
    console.log("доступ ЗАБОРОНЕНО - ключ доступу відсутній");
    return res.sendStatus(404);
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err) => {
    if (err) {
      console.log("НЕ АВТОРИЗОВАНО - ключ доступу невірний");
      return res.sendStatus(404);
    }
    next();
  });
};

module.exports = checkAccess;
