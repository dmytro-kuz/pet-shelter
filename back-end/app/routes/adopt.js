const router = require("express").Router();
const service = require("../services/adopt");

router.post("/", async (req, res, next) => {
  return service
    .createAdopt(req.body)
    .then((data) => res.status(200).json(data))
    .catch((err) => next(err));
});

module.exports = router;
