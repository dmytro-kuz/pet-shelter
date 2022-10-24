const router = require("express").Router();
const service = require("../services/overstay");

router.post("/", async (req, res, next) => {
  return service
    .createOverstay(req.body)
    .then((data) => res.status(200).json(data))
    .catch((err) => next(err));
});

module.exports = router;
