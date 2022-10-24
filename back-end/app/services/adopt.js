const adoptDataService = require("../data/adopt");
const petsDataService = require("../data/pets");
const overstayDataService = require("../data/overstay");

const createAdopt = async (data) => {
  const newAdopt = await adoptDataService.create(data);
  if (newAdopt) {
    return { status: "success", message: "Вітаємо ваша заявка на всиновлення прийнята" };
  } else {
    return { status: "rejected", message: "На жаль заявка не прийнята" };
  }
};

const updateAdopt = async (data) => {
  const newAdopt = await adoptDataService.updateById(data);
  if (newAdopt) {
    if (newAdopt.adoptStatus == "прилаштовано") {
      await overstayDataService.updateByPet({
        id: newAdopt.pet_id,
        status: "прилаштовано",
      });
      await petsDataService.update({ _id: newAdopt.pet_id, status: "Прилаштований" });
    }
    return _addPetName(newAdopt);
  } else {
    return { status: "rejected", message: "Версія документу з яким ви працюєте змінилася" };
  }
};

const getAllAdopts = async (params) => {
  return await adoptDataService.getAll(params);
};

const getAdoptById = async (id) => {
  const adopt = await adoptDataService.getById(id);
  return _addPetName(adopt);
};

const deleteAdopt = async (id) => {
  const deleteAdopt = await adoptDataService.deleteById(id);
  if (deleteAdopt) {
    return { status: "success", message: "Видалено успішно" };
  } else {
    return { status: "rejected", message: "Не вдалося видалити" };
  }
};

const getCount = async (params) => {
  return await adoptDataService.getCount(params);
};

module.exports = {
  createAdopt,
  updateAdopt,
  getAllAdopts,
  getAdoptById,
  deleteAdopt,
  getCount,
};

const _addPetName = async (data) => {
  const adopt = data;
  const pet = await petsDataService.getById(adopt.pet_id);
  const result = {
    ...adopt._doc,
    petName: pet.name,
  };
  return result;
};
