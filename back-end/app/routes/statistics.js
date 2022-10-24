const router = require("express").Router();
const service = require("../services/statistics");

// get pie statistic
router.get("/pets", async (req, res, next) => {
  try {
    const data = await service.getPets(req.query);

    return res.status(200).json(data);
  } catch (err) {
    return next(err);
  }
});

// get diagram statistic
router.get("/donates", async (req, res, next) => {
  try {
    const data = await service.getDonates();

    return res.status(200).json(data);
  } catch (err) {
    return next(err);
  }
});
// get progress statistic
router.get("/pets-need", async (req, res, next) => {
  try {
    const data = await service.getPetsNeed(req.query);

    return res.status(200).json(data);
  } catch (err) {
    return next(err);
  }
});
router.get("/count-food-each", async (req, res, next) => {
  try {
    const data = await service.getMonthCountFood(req.query);

    return res.status(200).json(data);
  } catch (err) {
    return next(err);
  }
});
router.get("/count-drug-each", async (req, res, next) => {
  try {
    const data = await service.getMonthCountDrug(req.query);

    return res.status(200).json(data);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
