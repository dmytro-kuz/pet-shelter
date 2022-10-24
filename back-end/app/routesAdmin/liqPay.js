const router = require("express").Router();
const service = require("../services/liqPay");
const donateService = require("../services/donate");

router.post("/", async (req, res, next) => {
  return await service.makePayment(req.body).then((paymentResult) => {
    res.status(200).json(paymentResult);
    donateService.createDonate(paymentResult);
  });
});

router.get("/", async (req, res, next) => {
  return await donateService.getAmountCount().then((totalAmount) => {
    res.status(200).json(totalAmount);
  });
});

module.exports = router;
