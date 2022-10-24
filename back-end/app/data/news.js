const News = require('../models/news')

const create = (data) => {
  return new News(data).save()
}

const getAllUI = () => {
  return News.find()
}

const getAll = async (params) => {
  const page = parseInt(params.page);
  const limit = parseInt(params.limit);
  const index = page * limit;
  // const photoFilter = params.role === "admin" ? 0 : 1;

  const list = await News.find(_generateQuery(params), {
    title: 1,
    subtitle: 1,
    // text:1,
    createdAt: 1,
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
  return News.countDocuments(_generateQuery(params));
};

const _generateSortQuery = (params) => {
  const sortQuery = {};
  if (params.active && params.direction) {
    sortQuery[params.active] = params.direction;
  }
  return sortQuery;
};

const _generateQuery = (params) => {
  const query = {};

  if (params.hasOwnProperty("title")) {
    query.title = {
      $regex: params.title,
      $options: "i",
    };
  }

  return query;
};

const getById = async (id) => {
  return await News.findById(id);
};

const update = async (data) => {
  return await News.findByIdAndUpdate(data._id, data, { new: true });
};

const deleteNews = async (data) => {
  return await News.findByIdAndDelete(data.id);
};

const addNewPhoto = async (data) => {
  const newsDetail = await News.findById(data._id);
  return await News.findByIdAndUpdate(
    data._id,
    { photos: [...newsDetail.photos, ...data.photos] },
    { new: true },
  );
};

const deletePhoto = async (data) => {
  const deletePhoto = await News.updateOne(
    { _id: data.id },
    { $pull: { photos: { $in: data.photoName } } },
    { new: true }
  );
  if (deletePhoto.modifiedCount) {
    return { status: "success" };
  }
};

const changePhoto = async (data) => {
  const changePhoto = await News.updateOne(
    { _id: data.id },
    { $set: { "photos.$[filter]": data.newPhoto } },
    { arrayFilters: [{ filter: { $eq: data.prev } }] }
  );

  if (changePhoto.modifiedCount) {
    return { photos: data.newPhoto };
  }
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  deleteNews,
  addNewPhoto,
  deletePhoto,
  changePhoto,
  getAllUI
}