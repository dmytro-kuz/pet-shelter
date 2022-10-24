const router = require("express").Router();
const servicePets = require("../services/pets");
const serviceOverstay = require("../services/overstay");
const serviceAdopt = require("../services/adopt");
const serviceDonate = require("../services/donate");
const serviceFood = require("../services/foods");

router.get("/", async (req, res, next) => {
  try {
    const data = { pets: {}, food: {}, donate: {} };
    data.pets.all = await servicePets.getCount({ status: "Живий" });
    data.pets.dogs = await servicePets.getCount({ type: "Собака" });
    data.pets.cats = await servicePets.getCount({ type: "Кіт" });
    data.overstay = await serviceOverstay.getCount({});
    data.adopt = await serviceAdopt.getCount({});
    data.donate.all = await serviceDonate.getAmountCount();
    data.donate.today = await serviceDonate.getAmountByToday();
    data.food.dogs = await serviceFood.getCount({ type: "Собака" });
    data.food.cats = await serviceFood.getCount({ type: "Кіт" });
    return res.status(200).json(data);
  } catch (err) {
    return next(err);
  }
});
module.exports = router;
