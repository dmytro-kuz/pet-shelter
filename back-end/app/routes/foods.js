const router = require("express").Router();
const service = require("../services/foods");

router.post("/", async (req, res, next) => {
  return service
    .createFood(req.body)
    .then((data) => res.status(200).json(data))
    .catch((err) => next(err));
});

router.get('/', async (req, res, next) => {
  try {
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)
    const startIndex = page * limit
    const data = await service.getFoodList(limit, startIndex)

    return res.status(200).json(data);
  } catch (err) {
    return next(err);
  }
})

module.exports = router;
