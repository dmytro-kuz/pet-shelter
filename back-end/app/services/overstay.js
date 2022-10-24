const overstayDataService = require("../data/overstay");
const petsDataService = require("../data/pets");

const createOverstay = async (data) => {
  const dateChecked = await overstayDataService.getByPetIdAndDate(data.pet_id, data.overstayDates);

  if (!dateChecked.length) {
    await overstayDataService.create(data);
    return { status: "success", message: "Вітаємо ваша заявка на перетримку прийнята" };
  } else {
    return { status: "rejected", message: "Вибачте, на жаль деякі з обраних дат вже недоступні" };
  }
};

const updateOverstay = async (data) => {
  const overstay = await overstayDataService.getById(data._id);
  const reservedDates = overstay.overstayDates;
  const newDates = data.overstayDates;
  let checkDates = [];
  newDates.forEach((date) => {
    if (reservedDates.indexOf(date) == -1) {
      checkDates.push(date);
    }
  });
  const dateChecked = await overstayDataService.getByPetIdAndDate(overstay.pet_id, checkDates);
  if (!dateChecked.length) {
    const newOverstay = await overstayDataService.updateById(data);
    if (newOverstay) {
      return _getPetAndDates(newOverstay);
    } else {
      return { status: "rejected", message: "Версія документу з яким ви працюєте змінилася" };
    }
  } else {
    return { status: "unavailable", message: "Вибачте, на жаль обрані дати вже недоступні" };
  }
};

const getAllOverstays = async (params) => {
  return await overstayDataService.getAll(params);
};

const getOverstayById = async (id) => {
  const overstay = await overstayDataService.getById(id);
  return _getPetAndDates(overstay);
};

const getResDatesByPetId = async (id) => {
  const allOverstaysByPet = await overstayDataService.getByPetId(id);
  return _reservedDatesArray(allOverstaysByPet);
};

const getCount = async (params) => {
  return await overstayDataService.getCount(params);
};

const deleteOverstay = async (id) => {
  const deleteOverstay = await overstayDataService.deleteById(id);
  if (deleteOverstay) {
    return { status: "success", message: "Видалено успішно" };
  } else {
    return { status: "rejected", message: "Не вдалося видалити" };
  }
};

module.exports = {
  createOverstay,
  updateOverstay,
  getAllOverstays,
  getOverstayById,
  getResDatesByPetId,
  deleteOverstay,
  getCount,
};

const _reservedDatesArray = (overstays) => {
  let dates = [];
  overstays.forEach((element) => dates.push(element.overstayDates));
  return dates.flat();
};

const _getPetAndDates = async (data) => {
  const overstay = data;
  const pet = await petsDataService.getById(overstay.pet_id);
  const allOverstaysByPet = await overstayDataService.getByPetId(overstay.pet_id);
  const result = {
    ...overstay._doc,
    petName: pet.name,
    allOverstayDates: _reservedDatesArray(allOverstaysByPet),
  };
  return result;
};
