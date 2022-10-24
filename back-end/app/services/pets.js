const petsDataService = require("../data/pets");
const overstayServices = require("../services/overstay");

const getPetsListPrev = async (params) => {
  return await petsDataService.getAllprev(params);
};

const getPetById = async (id) => {
  const pet = await petsDataService.getById(id);
  pet.overstayDates = await overstayServices.getResDatesByPetId(id);
  return pet;
};

const getCount = async (params) => {
  return await petsDataService.getCount(params);
};

const createPet = async (data) => {
  return await petsDataService.createPet(data);
};

const updateById = async (pet) => {
  const status = await petsDataService.update(pet);
  if (status) {
    return status;
  } else {
    return {
      status: "rejected",
      message: "Версія документа з яким Ви працюєте змінилась",
    };
  }
};

const deletePetById = async (id) => {
  if (await petsDataService.deletePet(id)) {
    return { status: "success" };
  } else {
    return { status: "error" };
  }
};

const addNewPhoto = async (data) => {
  return await petsDataService.addNewPhoto(data);
};

const deletePetPhoto = async (data) => {
  return await petsDataService.deletePhoto(data);
};

const changeSelectedPhoto = async (data) => {
  return await petsDataService.changePhoto(data);
};

module.exports = {
  getPetsListPrev,
  getPetById,
  createPet,
  updateById,
  deletePetById,
  getCount,
  addNewPhoto,
  deletePetPhoto,
  changeSelectedPhoto,
};
