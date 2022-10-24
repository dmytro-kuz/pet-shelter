const foodData = require("../data/foods");

const getFoodList = async (limit, index) => {
  return await foodData.getAll(limit, index);
};

const createFood = async (data) => {
  return await foodData.create(data);
};

const getCount = async (params) => {
  return await foodData.getCount(params);
};

module.exports = {
  getFoodList,
  createFood,
  getCount,
};
