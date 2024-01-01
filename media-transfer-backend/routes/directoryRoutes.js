const express = require("express");
const mediaRoutes = express.Router();

const {
  makeDirectory,
  renameDirectory,
  deleteDirectory,
  getRootDirectory,
  getDirectoryContents,
} = require("../controller/directoryController");

mediaRoutes.route("/makeDirectory").post(makeDirectory);
mediaRoutes.route("/renameDirectory").put(renameDirectory);
mediaRoutes.route("/deleteDirectory").delete(deleteDirectory);
mediaRoutes.route("/getRootDirectory").get(getRootDirectory);
mediaRoutes.route("/getDirectoryContents").post(getDirectoryContents);

module.exports = mediaRoutes;

