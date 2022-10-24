const PetData = require("../data/pets");
const OverstayData = require("../data/overstay");
const DonateData = require("../data/donate");
// Admin data
const FoodData = require("../data/foods");
const DrugData = require("../data/drugs");
const moment = require("moment");
const NeedCount = require("../data/need_count");

const getPets = async (params) => {
  const pets = await PetData.getAllprev(params);

  const adopted = await PetData.getCount({
    role: "admin",
    status: "Прилаштований",
  });
  const overstays = await OverstayData.getOverstaysByDate(
    +moment().startOf("day")
  );
  /*Pets in the shelter*/
  const overstayedPetIds = overstays.map((over) => over.pet_id);

  const petsInShelter = (await pets.amount) - overstays.length;

  return [
    {
      name: "Зараз в організації",
      value: petsInShelter,
    },
    {
      name: "Сьогодні на перетримці",
      value: overstays.length,
    },
    {
      name: "Прилаштовано",
      value: adopted,
    },
  ];
};

const getDonates = async () => {
  let result = [
    {
      name: "Січень",
      series: [
        {
          name: "Січень",
          value: 0,
        },
      ],
    },
    {
      name: "Лютий",
      series: [
        {
          name: "Лютий",
          value: 0,
        },
      ],
    },
    {
      name: "Березень",
      series: [
        {
          name: "Березень",
          value: 0,
        },
      ],
    },
    {
      name: "Квітень",
      series: [
        {
          name: "Квітень",
          value: 0,
        },
      ],
    },
    {
      name: "Травень",
      series: [
        {
          name: "Травень",
          value: 0,
        },
      ],
    },
    {
      name: "Червень",
      series: [
        {
          name: "Червень",
          value: 0,
        },
      ],
    },
    {
      name: "Липень",
      series: [
        {
          name: "Липень",
          value: 0,
        },
      ],
    },
    {
      name: "Серпень",
      series: [
        {
          name: "Серпень",
          value: 0,
        },
      ],
    },
    {
      name: "Вересень",
      series: [
        {
          name: "Вересень",
          value: 0,
        },
      ],
    },
    {
      name: "Жовтень",
      series: [
        {
          name: "Жовтень",
          value: 0,
        },
      ],
    },
    {
      name: "Листопад",
      series: [
        {
          name: "Листопад",
          value: 0,
        },
      ],
    },
    {
      name: "Грудень",
      series: [
        {
          name: "Грудень",
          value: 0,
        },
      ],
    },
  ];

  const donates = await DonateData.getYearDonates();

  donates.map((donate) => {
    let date = new Date(donate.createDate);
    let keyObj = date.getMonth();
    if (keyObj >= 0) {
      result[keyObj].series[0].value += donate.amount;
    }
  });

  return result;
};

const getPetsNeed = async (params) => {
  const amountFood = await FoodData.getCount({}, +moment().startOf("month"));
  const needCountFood = await getMonthCountFood();
  const amountDrug = await DrugData.getCount(
    { status: "придбано" },
    +moment().startOf("month")
  );
  const needCountDrug = await getMonthCountDrug();

  const amountNeedDrug = await DrugData.getCount(
    { status: "потрібно" },
    +moment().startOf("month")
  );

  return [
    {
      name: "Кількість придбаного корму",
      value: Math.min(Math.round((amountFood / needCountFood) * 100), 100),
    },
    {
      name: "Кількість придбаних ліків",
      value: Math.min(Math.round((amountDrug / needCountDrug) * 100), 100),
    },

    {
      name: "Кількість потрібних ліків",
      value: Math.min(Math.round((amountNeedDrug / needCountDrug) * 100), 100),
    },
  ];
};
const createFood = async (data) => {
  return await FoodData.create(data);
};
const createDrug = async (data) => {
  return await DrugData.create(data);
};
const updateFoodCount = async (data) => {
  return await NeedCount.update("food", data.count);
};
const updateDrugCount = async (data) => {
  return await NeedCount.update("drug", data.count);
};

const getMonthCountFood = async () => {
  let data = await NeedCount.getCountByType("food");
  return data.count ?? 0;
};

const getMonthCountDrug = async () => {
  let data = await NeedCount.getCountByType("drug");
  return data.count ?? 0;
};
const getFoodData = async (params) => {
  return await FoodData.getAll(params);
};
const getDrugData = async (params) => {
  return await DrugData.getAll(params);
};
const getCountNeedForEach = async ({ count }) => {
  return await NeedCount.getCountNeed({ count });
};
const deleteFood = async (food) => {
  return await FoodData.deleteFood(food);
};
const deleteDrug = async (drug) => {
  return await DrugData.deleteDrug(drug);
};

module.exports = {
  getPets,
  getDonates,
  getPetsNeed,
  getMonthCountDrug,
  getMonthCountFood,
  updateDrugCount,
  createDrug,
  updateFoodCount,
  createFood,
  getFoodData,
  getDrugData,
  getCountNeedForEach,
  deleteFood,
  deleteDrug,
};
