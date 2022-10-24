const router = require("express").Router();
const service = require("../services/overstay");

router.post("/", async (req, res, next) => {
  return service
    .createOverstay(req.body)
    .then((data) => res.status(200).json(data))
    .catch((err) => next(err));
});

router.put("/edit", async (req, res, next) => {
  return service
    .updateOverstay(req.body)
    .then((data) => res.status(200).json(data))
    .catch((err) => next(err));
});

router.get("/", async (req, res, next) => {
  return await service
    .getAllOverstays(req.query)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => next(err));
});

router.get("/id", async (req, res, next) => {
  return service
    .getOverstayById(req.query.id)
    .then((data) => res.status(200).json(data))
    .catch((err) => next(err));
});

router.delete("/delete", async (req, res, next) => {
  return service
    .deleteOverstay(req.query.id)
    .then((data) => res.status(200).json(data))
    .catch((err) => next(err));
});

module.exports = router;
