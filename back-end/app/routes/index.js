const checkAccess = require("../_helpers/checkAccess");
const router = require("express").Router();

router.use("/pets", require("./pets"));
router.use("/adopt", require("./adopt"));
// router.use("/donate", require("./donate"));
router.use("/overstay", require("./overstay"));
router.use("/liqPay", require("./liqPay"));
router.use("/auth", require("./auth"));
router.use("/news", require("./news"));
router.use("/auth", checkAccess, (req, res) => {
  res.json({ status: "success" });
});

router.use("/statistics", require("./statistics"));
router.use("/foods", require("./foods"));
router.use("/drugs", require("./drugs"));

module.exports = router;
