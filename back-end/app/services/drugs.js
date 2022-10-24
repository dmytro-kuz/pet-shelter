const drugData = require("../data/drugs");

const getDrugList = async (limit, index) => {
  return await drugData.getAll(limit, index);
};

const createDrug = async (data) => {
  return drugData.create(data);
};

module.exports = {
  getDrugList,
  createDrug,
};
