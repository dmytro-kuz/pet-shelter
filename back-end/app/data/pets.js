const Pet = require("../models/pets");

const getAllprev = async (params) => {
  const page = parseInt(params.page);
  const limit = parseInt(params.limit);
  const index = page * limit;
  const photoFilter = params.role === "admin" ? 0 : 1;

  const list = await Pet.find(_generateQuery(params), {
    name: 1,
    status: 1,
    type: 1,
    size: 1,
    sex: 1,
    photos: { $slice: photoFilter },
    _id: 1,
  })
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
  return Pet.countDocuments(_generateQuery(params));
};

const createPet = (data) => {
  return new Pet(data).save();
};

const _generateSortQuery = (params) => {
  const sortQuery = {};
  if (params.active && params.direction) {
    sortQuery[params.active] = params.direction;
  }
  return sortQuery;
};

const _generateQuery = (params) => {
  const toDate = new Date();
  const fromDate = new Date();
  const query = {};

  if (params.hasOwnProperty("role") && params.role === "admin") {
    if (params.hasOwnProperty("status")) {
      query.status = params.status;
    }
  } else {
    query.status = { $nin: ["Мертвий", "Прилаштований"] };
  }
  if (params.hasOwnProperty("name")) {
    query.name = {
      $regex: params.name,
      $options: "i",
    };
  }
  if (params.hasOwnProperty("sex")) {
    query.sex = params.sex;
  }
  if (params.hasOwnProperty("type")) {
    query.type = params.type;
  }
  if (params.hasOwnProperty("size")) {
    query.size = params.size;
  }
  if (params.hasOwnProperty("age")) {
    switch (params.age) {
      case "до 1 року":
        toDate.setFullYear(toDate.getFullYear() - 1);
        query.birthDate = { $gte: toDate };
        break;
      case "2 - 5 років":
        toDate.setFullYear(toDate.getFullYear() - 2);
        fromDate.setFullYear(fromDate.getFullYear() - 5);
        query.birthDate = { $gte: fromDate, $lte: toDate };
        break;
      case "більше 5-ти років":
        toDate.setFullYear(toDate.getFullYear() - 5);
        query.birthDate = { $lte: toDate };
        break;
    }
  }
  return query;
};

const getById = async (id) => {
  return await Pet.findById(id);
};

const update = async (pet) => {
  return await Pet.findOneAndUpdate({ _id: pet._id, __v: pet.__v }, pet, {
    new: true,
  });
};

const deletePet = async (pet) => {
  return await Pet.findByIdAndDelete(pet.id);
};

const addNewPhoto = async (data) => {
  const petDetail = await Pet.findById(data._id);
  return await Pet.findByIdAndUpdate(
    data._id,
    { photos: [...petDetail.photos, ...data.photos] },
    { new: true }
  );
};

const deletePhoto = async (data) => {
  const deletePhoto = await Pet.updateOne(
    { _id: data.id },
    { $pull: { photos: { $in: data.photoName } } },
    { new: true }
  );
  if (deletePhoto.modifiedCount) {
    return { status: "success" };
  }
};

const changePhoto = async (data) => {
  const changePhoto = await Pet.updateOne(
    { _id: data.id },
    { $set: { "photos.$[filter]": data.newPhoto } },
    { arrayFilters: [{ filter: { $eq: data.prev } }] }
  );

  if (changePhoto.modifiedCount) {
    return { photos: data.newPhoto };
  }
};

module.exports = {
  getAllprev,
  getById,
  getCount,
  createPet,
  update,
  deletePet,
  addNewPhoto,
  deletePhoto,
  changePhoto,
};
