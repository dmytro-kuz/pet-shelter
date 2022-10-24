const generate = require("rdm-str");
const timestamp = Date.now();
require("dotenv").config();
const dataServ = require("../data/liqPay");
const LiqPay = require("../lib/liqPayLib");
const liqpay = new LiqPay(process.env.PUBLIC_KEY, process.env.PRIVATE_KEY);

const makePayment = async (paymentData) => {
  let liqPayParams = liqpay.cnb_object({
    public_key: process.env.PUBLIC_KEY,
    version: "3",
    phone: "380954468752",
    action: "pay",
    amount: paymentData.paymentAmount.toString(),
    currency: "UAH",
    description: "Благодійність на притулок",
    order_id: "order-" + timestamp + generate((len = 6)),
    code: "37507880",
    card: paymentData.paymentCard,
    card_exp_month: paymentData.paymentDateLimit.slice(0, 2),
    card_exp_year: paymentData.paymentDateLimit.slice(2, 4),
    card_cvv: paymentData.paymentCvv,
  });

  return await dataServ.sendPayment(liqPayParams);
};

module.exports = {
  makePayment,
};
