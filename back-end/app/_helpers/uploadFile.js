const multer = require("multer");
const path = require("path");
const DIR = "./public/";

//files-saving direction and file-name
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = Date.now().toString() + path.extname(file.originalname);
    cb(null, fileName);
  },
});

//size and type validation
const uploadFile = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/webp"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg, webp and .jpeg format allowed!"));
    }
  },
});

module.exports = uploadFile;
