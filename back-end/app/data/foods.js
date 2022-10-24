const Foods = require("../models/foods");
const moment = require("moment");
const create = (food) => {
  return new Foods(food).save();
};

const getAll = async (params) => {
  const page = parseInt(params.page);
  const limit = parseInt(params.limit);
  const index = page * limit;

  const list = await Foods.find(_generateQuery(params))
    .sort(_generateSortQuery(params))
    .limit(limit)
    .skip(index)
    .exec();
  const amount = await getCount(params);
  const result = {};
  result.list = list;
  result.amount = amount;
  result.sum = await getAmountFood();
  return result;
};
const _generateQuery = (params) => {
  const query = {};

  if (params.hasOwnProperty("name")) {
    query.name = {
      $regex: params.name,
      $options: "i",
    };
  }

  return query;
};
const _generateSortQuery = (params) => {
  if (params.active && params.direction) {
    const sortQuery = {};
    sortQuery[params.active] = params.direction;
    return sortQuery;
  }
};

const getCount = (params) => {
  return Foods.countDocuments(_generateQuery(params));
};
const deleteFood = (food) => {
  return Foods.findByIdAndDelete(food._id);
};
const getAmountFood = async () => {
  const data = await Foods.aggregate([
    {
      $group: {
        _id: 0,
        number: { $sum: "$number" },
      },
    },
  ]);

  return Math.round(data[0].number);
};
module.exports = {
  create,
  getAll,
  getCount,
  deleteFood,
  getAmountFood,
  _generateQuery,
};
