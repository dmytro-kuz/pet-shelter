const newsDataService = require('../data/news')

const createNews = async(data) => {
    return await newsDataService.create(data);
}

const getAllNews = async(params) => {
    return await newsDataService.getAll(params);
}

const getAllNewsUI = async() => {
    return await newsDataService.getAllUI();
}

const getNewsById = async (id) => {
    return await newsDataService.getById(id);
};

const updateNewsById = async (data) => {
    return await newsDataService.update(data);
};

const deleteNewsById = async (id) => {
    if (await newsDataService.deleteNews(id)){
        return { status: "success" };
    } else {
        return { status: "error" };
    }
};

const addNewsPhoto = async (data) => {
    return await newsDataService.addNewPhoto(data);
  };
  
  const deleteNewsPhoto = async (data) => {
    return await newsDataService.deletePhoto(data);
  };
  
  const changeSelectedPhoto = async (data) => {
    return await newsDataService.changePhoto(data);
  };

module.exports = {
    createNews,
    getAllNews,
    getNewsById,
    updateNewsById,
    deleteNewsById,
    addNewsPhoto,
    deleteNewsPhoto,
    changeSelectedPhoto,
    getAllNewsUI,
}