const Drugs = require("../models/drugs");

const create = (drug) => {
  return new Drugs(drug).save();
};

const getAll = async (params) => {
  const page = parseInt(params.page);
  const limit = parseInt(params.limit);
  const index = page * limit;

  const list = await Drugs.find(_generateQuery(params))
    .sort(_generateSortQuery(params))
    .limit(limit)
    .skip(index)
    .exec();
  const amount = await getCount();
  const result = {};
  result.list = list;
  result.amount = amount;
  result.sum = await getAmountDrug();
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
  return Drugs.countDocuments(params);
};
const deleteDrug = (drug) => {
  return Drugs.findByIdAndDelete(drug._id);
};
const getAmountDrug = async () => {
  const data = await Drugs.aggregate([
    {
      $match: {
        status: { $eq: "придбано" },
      },
    },
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
  deleteDrug,
  getAmountDrug,
  _generateQuery,
};
