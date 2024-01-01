const express = require("express");
const mediaRoutes = express.Router();
const multer = require("multer");
const { localFolderPath } = require("../config/config");
const { join } = require("path");
const { handleFormData } = require("../middleware/handleFormData");

const { uploadFile, downloadZip } = require("../controller/mediaController");

mediaRoutes
  .route("/upload")
  .post(handleFormData, uploadFile);

mediaRoutes.route("/download").post(downloadZip);

module.exports = mediaRoutes;
