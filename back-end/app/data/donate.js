const Donate = require("../models/donate");
const moment = require("moment");

const create = (donate) => {
  return new Donate(donate).save();
};

const update = async (donate) => {
  return await Donate.findByIdAndUpdate(donate._id, donate, { new: true });
};

const getAmount = async () => {
  const data = await Donate.aggregate([
    {
      $match: {
        status: { $eq: "Успішно" },
      },
    },
    {
      $group: {
        _id: 0,
        amount: { $sum: "$amount" },
      },
    },
  ]);
  return Math.round(data[0].amount);
};

const getAll = async (params) => {
  const page = parseInt(params.page);
  const limit = parseInt(params.limit);
  const index = page * limit;

  const list = await Donate.find(_generateQuery(params))
    .sort(_generateSortQuery(params))
    .limit(limit)
    .skip(index)
    .exec();
  const amount = await getCount(params);
  const result = {};
  result.list = list;
  result.amount = amount;
  return result;
};

const getCount = async (params) => {
  return await Donate.countDocuments(_generateQuery(params));
};

const _generateSortQuery = (params) => {
  const sortQuery = {};
  if (params.active && params.direction) {
    sortQuery[params.active] = params.direction;
  }
  return sortQuery;
};

const getAmountByToday = async () => {
  const today = moment().format("YYYY-MM-DD").toString();
  const data = await Donate.aggregate([
    {
      $match: {
        createDate: { $gte: new Date(today) },
        status: { $eq: "Успішно" },
      },
    },
    {
      $group: {
        _id: 0,
        amount: { $sum: "$amount" },
      },
    },
  ]);
  if (data.length === 0) {
    return 0;
  }
  return data[0].amount;
};

const _generateQuery = (params) => {
  const query = {};
  if (params.today) {
    query.createDate = {
      $gte: new Date(params.today),
    };
  }
  if (
    params.hasOwnProperty("intervalDateTo") &&
    params.hasOwnProperty("intervalDateFrom")
  ) {
    query.createDate = {
      $gte: params.intervalDateFrom,
      $lte: new Date(params.intervalDateTo).setUTCHours(23, 59, 59, 999),
    };
  }
  if (
    params.hasOwnProperty("intervalDateFrom") &&
    params.intervalDateTo === undefined
  ) {
    query.createDate = { $gte: params.intervalDateFrom };
  }
  if (
    params.hasOwnProperty("intervalDateTo") &&
    params.intervalDateFrom === undefined
  ) {
    query.createDate = {
      $lte: new Date(params.intervalDateTo).setUTCHours(23, 59, 59, 999),
    };
  }
  if (params.hasOwnProperty("viewed") && params.viewed === false) {
    query.viewed = params.viewed;
  }
  if (params.hasOwnProperty("status")) {
    query.status = params.status;
  }
  return query;
};

const getYearDonates = async () => {
  const year = await Donate.find({
    createdAt: {
      $gte: moment().startOf("year").toDate(),
      $lte: moment().endOf("day").toDate(),
    },
  });
  return year;
};

module.exports = {
  create,
  getAmount,
  getAll,
  getYearDonates,
  getCount,
  getAmountByToday,
  update,
};
