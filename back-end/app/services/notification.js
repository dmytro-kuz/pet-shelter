const moment = require("moment");
const serviceOverstay = require("./overstay");
const serviceAdopt = require("./adopt");
const serviceDonate = require("./donate");

const getNotification = async () => {
  const amount = {};
  amount.overstay = await serviceOverstay.getCount({
    overstayStatus: "в обробці",
  });
  amount.adopt = await serviceAdopt.getCount({ adoptStatus: "в обробці" });
  amount.donate = await serviceDonate.getCount({
    viewed: false,
    status: "Успішно",
  });
  return amount;
};

module.exports = {
  getNotification,
};
