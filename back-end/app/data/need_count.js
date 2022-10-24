const NeedCount = require("../models/need_count");
const moment = require("moment");

const getCountByType = async (type) => {
  return await NeedCount.findOne({
    type: type,
    createdAt: {
      $gte: moment().startOf("month").toDate(),
      $lte: moment().endOf("month").toDate(),
    },
  });
};
const update = async (type, count) => {
  let data = await getCountByType(type);
  if (data) {
    data = await NeedCount.findByIdAndUpdate(
      data._id,
      { count: count },
      {
        new: true,
      }
    );
  } else {
    data = await NeedCount.create({ type: type, count: count });
  }
  return data;
};
const getCountNeed = async (count) => {
  return await NeedCount.find(count);
};
module.exports = {
  getCountByType,
  update,
  getCountNeed,
};
