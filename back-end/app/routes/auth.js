const router = require("express").Router();
const service = require("../services/auth");

//get tokens by auth
router.post("/", async (req, res, next) => {
  return service
    .getTokens(req.body)
    .then((data) =>
      data
        ? res.status(200).json(data)
        : res
            .status(401)
            .json({ message: "Введенний логін чи пароль є невірний" })
    )
    .catch((err) => next(err));
});

module.exports = router;
