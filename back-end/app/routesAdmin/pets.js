const router = require("express").Router();
const service = require("../services/pets");
const uploadFile = require("../_helpers/uploadFile");
const fs = require("fs");
const path = require("path");

// get pets list
router.get("/", async (req, res, next) => {
  try {
    req.query.role = "admin";
    const data = await service.getPetsListPrev(req.query);
    return res.status(200).json(data);
  } catch (err) {
    return next(err);
  }
});

//get by id
router.get("/details", async (req, res, next) => {
  return service
    .getPetById(req.query.id)
    .then((data) => res.status(200).json(data))
    .catch((err) => next(err));
});

// edit Pet
router.put("/", uploadFile.array("photoFiles", 10), async (req, res, next) => {
  try {
    const data = await service.updateById(req.body);
    return res.status(200).json(data);
  } catch (err) {
    return next(err);
  }
});

// add Pet photos
router.post("/photo", uploadFile.array("file", 10), async (req, res, next) => {
  req.body.photos = _createLinkFromFile(req);
  try {
    const data = await service.addNewPhoto(req.body);
    return res.status(200).json(data);
  } catch (err) {
    return next(err);
  }
});

// delete petPhoto
router.delete("/photo", async (req, res, next) => {
  const publicPath = path.join(__dirname, "../../", "public");
  fs.unlink(
    publicPath + "/" + req.query.photoName.split("public/")[1],
    (err) => {
      if (err) {
        console.error(err);
      }
    }
  );
  return service
    .deletePetPhoto(req.query)
    .then((data) => res.status(200).json(data))
    .catch((err) => next(err));
});

// change petPhoto
router.put(
  "/photo",
  uploadFile.array("newPhoto", 10),
  async (req, res, next) => {
    req.body.newPhoto = _createLinkFromFile(req);
    const publicPath = path.join(__dirname, "../../", "public");
    fs.unlink(publicPath + "/" + req.body.prev.split("public/")[1], (err) => {
      if (err) {
        console.error(err);
      }
    });
    return service
      .changeSelectedPhoto(req.body)
      .then((data) => res.status(200).json(data))
      .catch((err) => next(err));
  }
);

// delete Pets by id
router.delete("/", async (req, res, next) => {
  const pet = await service.getPetById(req.query.id);
  const publicPath = path.join(__dirname, "../../", "public");
  pet.photos.forEach((photo) => {
    fs.unlink(publicPath + "/" + photo.split("public/")[1], (err) => {
      if (err) {
        console.error(err);
      }
    });
  });
  try {
    const data = await service.deletePetById(req.query);
    return res.status(200).json(data);
  } catch (err) {
    return next(err);
  }
});

//create pet
router.post("/", uploadFile.array("photos", 10), async (req, res, next) => {
  if (req.files) {
    req.body.photos = _createLinkFromFile(req);
  }

  return service
    .createPet(req.body)
    .then((data) => res.status(200).json(data))
    .catch((err) => next(err));
});

module.exports = router;

const _createLinkFromFile = (req) => {
  const url = req.protocol + "://" + req.get("host");
  const reqFiles = [];
  req.files.forEach((file) => {
    reqFiles.push(url + "/public/" + file.filename);
  });
  return reqFiles;
};
