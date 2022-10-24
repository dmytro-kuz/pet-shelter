const Adopt = require("../models/adopt");

const create = (data) => {
  return new Adopt(data).save();
};

const updateById = (data) => {
  return Adopt.findOneAndUpdate({ _id: data._id, __v: data.__v }, data, { new: true });
};

const getAll = async (params) => {
  const page = parseInt(params.page);
  const limit = parseInt(params.limit);
  const index = page * limit;

  const list = await Adopt.find(_generateQuery(params))
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

const getCount = (params) => {
  return Adopt.countDocuments(_generateQuery(params));
};

const getById = (id) => {
  return Adopt.findById(id);
};

const deleteById = (id) => {
  return Adopt.findByIdAndRemove(id);
};

module.exports = {
  create,
  updateById,
  getAll,
  getById,
  deleteById,
  getCount,
};

const _generateQuery = (params) => {
  const query = {};

  if (params.hasOwnProperty("clientName")) {
    query.clientName = {
      $regex: params.clientName,
      $options: "i",
    };
  }
  if (params.hasOwnProperty("pet_id")) {
    query.pet_id = {
      $regex: params.pet_id,
      $options: "i",
    };
  }
  if (params.hasOwnProperty("clientPhone")) {
    query.clientPhone = {
      $regex: params.clientPhone,
      $options: "i",
    };
  }
  if (params.hasOwnProperty("adoptStatus")) {
    query.adoptStatus = params.adoptStatus;
  }

  return query;
};

const _generateSortQuery = (params) => {
  const sortQuery = {};
  if (params.active && params.direction) {
    sortQuery[params.active] = params.direction;
  }
  return sortQuery;
};
