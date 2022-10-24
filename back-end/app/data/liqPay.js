const axios = require("axios");
const qs = require("qs");
require("dotenv").config();
const url = process.env.LIQ_PAY_URL;

const sendPayment = async (liqPayParams) => {
  const data = await axios({
    url,
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: qs.stringify(liqPayParams),
  });

  let errMessage = data.data.err_description;
  if (errMessage === "Invalid parameter card") {
    errMessage = "Не вірний номер карти";
  }
  if (errMessage === "Бин карты не найден") {
    errMessage = "Бін карти не знайдено";
  }
  return {
    status: data.data.status === "success" ? "Успішно" : "Помилка",
    amount: data.data.amount,
    viewed: data.data.status === 'success' ? false : true,
    createDate: data.data.create_date || new Date(),
    errDescription: errMessage || "Відсутні",
  };
};
module.exports = { sendPayment };
