const express = require("express");
const mediaRoutes = express.Router();
const multer = require("multer");
const { localFolderPath } = require("../config/config");
const { join } = require("path");
const { handleFormData } = require("../middleware/handleFormData");

// Need to handle the multiple file upload mechanish

// const storage = multer.diskStorage({
//   destination: function (req, _, cb) {
//     const subFolderPath =
//       req.params?.subFolderPath == undefined ||
//       req.params?.subFolderPath == ":subFolderPath"
//         ? ""
//         : req.params.subFolderPath;
//     const dataStoredAt = join(localFolderPath, "/", subFolderPath);
//     console.log({dataStoredAt})
//     req['data_stored_at'] = dataStoredAt;
//     const destinationPath = dataStoredAt;
//     console.log('Upload Started !');
//     cb(null, destinationPath);
//   },
//   filename: function (_, file, cb) {
//     cb(null, file.originalname);
//   },
// });
// const upload = multer({ storage: storage });

const { uploadFile, downloadZip } = require("../controller/mediaController");

mediaRoutes
  .route("/upload")
  // .post(upload.single("file"), uploadFile);
  .post(handleFormData, uploadFile);

mediaRoutes.route("/download").post(downloadZip);

module.exports = mediaRoutes;
