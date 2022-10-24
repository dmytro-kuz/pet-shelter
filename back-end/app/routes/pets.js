const router = require("express").Router();
const service = require("../services/pets");

// get pets list
router.get("/", async (req, res, next) => {
  try {
    const data = await service.getPetsListPrev(req.query);
    return res.status(200).json(data);
  } catch (err) {
    return next(err);
  }
});

//get by id
router.get("/details", async (req, res, next) => {
  return service
    .getPetById(req.query.id)
    .then((data) => res.status(200).json(data))
    .catch((err) => next(err));
});

module.exports = router;
