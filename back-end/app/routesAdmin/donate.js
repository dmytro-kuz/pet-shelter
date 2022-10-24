const router = require("express").Router();
const service = require("../services/donate");

// create Donate
router.get("/", async (req, res, next) => {
  return await service
    .getAllDonates(req.query)
    .then((data) => res.status(200).json(data))
    .catch((err) => next(err));
});

// edit Donate
router.put("/", async (req, res, next) => {
  try {
    const data = await service.updateById(req.body);
    return res.status(200).json(data);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
