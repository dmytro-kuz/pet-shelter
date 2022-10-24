const Overstay = require("../models/overstay");

const create = (data) => {
  return new Overstay(data).save();
};

const updateById = (data) => {
  return Overstay.findOneAndUpdate({ _id: data._id, __v: data.__v }, data, { new: true });
};

const updateByPet = (data) => {
  return Overstay.updateMany({ pet_id: data.id }, { overstayStatus: data.status });
};

const getAll = async (params) => {
  const page = parseInt(params.page);
  const limit = parseInt(params.limit);
  const index = page * limit;

  const list = await Overstay.find(_generateQuery(params))
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
  return Overstay.countDocuments(_generateQuery(params));
};

const getOverstaysByDate = (date) => {
  return Overstay.find({ overstayDates: date });
};

const getById = (id) => {
  return Overstay.findById(id);
};

const getByPetId = (id) => {
  return Overstay.find({ pet_id: id });
};

const getByPetIdAndDate = (id, overstayDates) => {
  return Overstay.find({ pet_id: id, overstayDates: { $in: overstayDates } });
};

const deleteById = (id) => {
  return Overstay.findByIdAndRemove(id);
};

module.exports = {
  create,
  updateById,
  getAll,
  getById,
  getByPetId,
  deleteById,
  getOverstaysByDate,
  getByPetIdAndDate,
  getCount,
  updateByPet,
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
  if (params.hasOwnProperty("overstayStatus")) {
    query.overstayStatus = params.overstayStatus;
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
