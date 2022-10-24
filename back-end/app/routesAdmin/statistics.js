const router = require("express").Router();
const service = require("../services/statistics");
const foodService = require("../services/foods");
const drugService = require("../services/drugs");
router.post("/add-food", async (req, res, next) => {
  return service

    .createFood(req.body)
    .then((data) => res.status(200).json(data))
    .catch((err) => next(err));
});
router.put("/add-count-food", async (req, res, next) => {
  return service
    .updateFoodCount(req.body)
    .then((data) => res.status(200).json(data))
    .catch((err) => next(err));
});
router.post("/add-drug", async (req, res, next) => {
  return service
    .createDrug(req.body)
    .then((data) => res.status(200).json(data))
    .catch((err) => next(err));
});
router.put("/add-count-drug", async (req, res, next) => {
  return service
    .updateDrugCount(req.body)
    .then((data) => res.status(200).json(data))
    .catch((err) => next(err));
});
router.get("/get-count-food", async (req, res, next) => {
  return service
    .getMonthCountFood()
    .then((data) => res.status(200).json(data))
    .catch((err) => next(err));
});

router.get("/get-count-drug", async (req, res, next) => {
  return service
    .getMonthCountDrug()
    .then((data) => res.status(200).json(data))
    .catch((err) => next(err));
});

router.get("/food-data", async (req, res, next) => {
  return service
    .getFoodData(req.query)
    .then((data) => res.status(200).json(data))
    .catch((err) => next(err));
});

router.get("/drug-data", async (req, res, next) => {
  return service
    .getDrugData(req.query)
    .then((data) => res.status(200).json(data))
    .catch((err) => next(err));
});
router.delete("/food", async (req, res, next) => {
  return service
    .deleteFood(req.query)
    .then((data) => res.status(200).json(data))
    .catch((err) => next(err));
});
router.delete("/drug", async (req, res, next) => {
  return service
    .deleteDrug(req.query)
    .then((data) => res.status(200).json(data))
    .catch((err) => next(err));
});

module.exports = router;
