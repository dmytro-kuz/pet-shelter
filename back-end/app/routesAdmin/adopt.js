const router = require("express").Router();
const service = require("../services/adopt");

router.post("/", async (req, res, next) => {
  return service
    .createAdopt(req.body)
    .then((data) => res.status(200).json(data))
    .catch((err) => next(err));
});

router.put("/edit", async (req, res, next) => {
  return service
    .updateAdopt(req.body)
    .then((data) => res.status(200).json(data))
    .catch((err) => next(err));
});

router.get("/", async (req, res, next) => {
  return await service
    .getAllAdopts(req.query)
    .then((data) => res.status(200).json(data))
    .catch((err) => next(err));
});

router.get("/id", async (req, res, next) => {
  return service
    .getAdoptById(req.query.id)
    .then((data) => res.status(200).json(data))
    .catch((err) => next(err));
});

router.delete("/delete", async (req, res, next) => {
  return service
    .deleteAdopt(req.query.id)
    .then((data) => res.status(200).json(data))
    .catch((err) => next(err));
});

module.exports = router;
