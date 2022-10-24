const router = require("express").Router();
const service = require("../services/drugs");

router.post("/", async (req, res, next) => {
  return service
    .createDrug(req.body)
    .then((data) => res.status(200).json(data))
    .catch((err) => next(err));
});

router.get("/", async (req, res, next) => {
  try {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const startIndex = page * limit;
    const data = await service.getDrugList(limit, startIndex);

    return res.status(200).json(data);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
