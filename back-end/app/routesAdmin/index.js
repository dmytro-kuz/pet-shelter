const router = require("express").Router();

router.use("/pets", require("./pets"));
router.use("/adopt", require("./adopt"));
router.use("/donate", require("./donate"));
router.use("/overstay", require("./overstay"));
router.use("/liqPay", require("./liqPay"));
router.use("/dashboard", require("./dashboard"));
router.use("/statistics", require("./statistics"));
router.use("/news", require("./news"));

module.exports = router;
