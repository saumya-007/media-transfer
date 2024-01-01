const { responseSuccess, responseError } = require("../utils/constants");
const { localFolderPath } = require("../config/config");
const { promises } = require("fs");
const { join } = require("path");

module.exports.makeDirectory = async function (req, res) {
  try {
    const rootPath = req.body.location ? req.body.location : localFolderPath;
    const folderName = req.body?.folder_name
      ? req.body?.folder_name
      : "New Folder";

    let allItemsDirent = await promises.readdir(rootPath, {
      withFileTypes: true,
    });
    // If options.withFileTypes is set to true, the returned array will contain <fs.Dirent> objects.
    // Hence, we can use it to check it the item is a folder or not.
    allItemsDirent = allItemsDirent.filter((item) => item.isDirectory());
    const allFolder = allItemsDirent.map((dirent) => dirent.name);

    if (allFolder.includes(folderName)) {
      throw new Error("Folder already exists !");
    }

    await promises.mkdir(join(rootPath, folderName), { recursive: false });

    res.status(200).send({
      ...responseSuccess,
      data: "Folder Created !",
    });
  } catch (err) {
    res.status(400).send({
      ...responseError,
      message: err.message ? err.message : "Error while uploading file",
    });
  }
};

module.exports.renameDirectory = async function (req, res) {
  try {
    const rootPath = req.body.base_path ? req.body.base_path : localFolderPath;
    if (!(req.body?.new_name && req.body?.old_name)) {
      throw new Error("Please provide a folder name");
    }

    const newName = req.body.new_name;
    const oldName = req.body.old_name;

    let allItemsDirent = await promises.readdir(rootPath, {
      withFileTypes: true,
    });
    // If options.withFileTypes is set to true, the returned array will contain <fs.Dirent> objects.
    // Hence, we can use it to check it the item is a folder or not.
    allItemsDirent = allItemsDirent.filter((item) => item.isDirectory());
    const allFolder = allItemsDirent.map((dirent) => dirent.name);

    if (!allFolder.includes(oldName)) {
      throw new Error("Incorrect folder name found !");
    }

    if (allFolder.includes(newName)) {
      throw new Error("Folder with the same name already exists !");
    }

    await promises.rename(join(rootPath, oldName), join(rootPath, newName));

    res.status(200).send({
      ...responseSuccess,
      data: "Folder Renamed !",
    });
  } catch (err) {
    res.status(400).send({
      ...responseError,
      message: err.message ? err.message : "Error while renaming",
    });
  }
};

module.exports.deleteDirectory = async function (req, res) {
  try {
    const rootPath = req.body.folder_path;
    if (!rootPath) {
      throw new Error("Please provide a folder path");
    }

    if (rootPath == localFolderPath) {
      throw new Error("Invalid folder");
    }

    // Need to write code to delete recursively

    res.status(200).send({
      ...responseSuccess,
      data: "Folder Renamed !",
    });
  } catch (err) {
    res.status(400).send({
      ...responseError,
      message: err.message ? err.message : "Error while deleting",
    });
  }
};

module.exports.getRootDirectory = async function (req, res) {
  try {
    // throw new Error('SWR')
    res.status(200).send({
      ...responseSuccess,
      data: localFolderPath,
    });
  } catch (err) {
    res.status(400).send({
      ...responseError,
      message: err.message ? err.message : "Error while getting root directory",
    });
  }
};

module.exports.getDirectoryContents = async function (req, res) {
  try {
    const directoryPath = req.body.directory_path;
    if (!directoryPath) {
      throw new Error("Please provide a directory path");
    }

    const allItemsDirent = await promises.readdir(directoryPath, {
      withFileTypes: true,
    });

    const response = allItemsDirent.map((dirent) => {
      return {
        name: dirent.name,
        is_directory: dirent.isDirectory(),
        extension: dirent.name.slice(dirent.name.lastIndexOf('.') + 1),
      }
    })

    res.status(200).send({
      ...responseSuccess,
      data: response,
    });
  } catch (err) {
    res.status(400).send({
      ...responseError,
      message: err.message ? err.message : "Error while getting root directory",
    });
  }
};
