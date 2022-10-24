const donateDataService = require("../data/donate");

const createDonate = async (donate) => {
  return await donateDataService.create(donate);
};

const getAmountCount = async () => {
  return await donateDataService.getAmount();
};

const getAllDonates = async (params) => {
  return await donateDataService.getAll(params);
};
const getAmountByToday = async () => {
  return await donateDataService.getAmountByToday();
};
const getCount = async (params) => {
  return await donateDataService.getCount(params);
};

const updateById = async (donate) => {
  return await donateDataService.update(donate);
};

module.exports = {
  createDonate,
  getAmountCount,
  getAllDonates,
  getAmountByToday,
  getCount,
  updateById,
};
