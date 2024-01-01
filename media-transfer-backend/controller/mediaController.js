const { responseSuccess, responseError } = require("../utils/constants");
const archiver = require("archiver");
const decompress = require("decompress");
const fs = require("fs");
const { join, basename, resolve } = require("path");
const { localFolderPath } = require("../config/config");

module.exports.uploadFile = async function (req, res) {
  try {
    console.log("Upload Started !");
    const location = req.body.data_stored_at;
    const subFolderPath =
      location ? "" : location;
    const storageLocation = join(localFolderPath, "/", subFolderPath);

    await Promise.all(
      req.files.file.map(async (file) => {
        if (file.mimetype === 'application/zip') {
          await decompress(resolve(__dirname, file.filepath), resolve(storageLocation)); 
        } else {
          return fs.promises.rename(
            resolve(__dirname, file.filepath),
            resolve(storageLocation, file.originalFilename)
          );
        }
      })
    );

    // if (fileOriginalName.endsWith(".zip")) {
    //   await decompress(join(dataStoredAt, fileOriginalName), dataStoredAt);
    //   await fs.promises.rm(join(dataStoredAt, fileOriginalName), {
    //     recursive: true,
    //   });
    //   console.log("File decompressed and zip deleted");
    // }

    res.status(200).send({
      ...responseSuccess,
      data: `${
        req.file?.originalName ? req.file.originalName : "File"
      } Uploaded !`,
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({
      ...responseError,
      message: err.message ? err.message : "Error while uploading file",
    });
  }
};

module.exports.downloadZip = async function (req, res) {
  try {
    console.log("Download Started");
    const sourcePath = req.body.source_path;
    const downloadAsZip = req.body.download_as_zip;
    if (!sourcePath) {
      throw new Error("Invalid source path provided.");
    }

    const isFolder = (await fs.promises.lstat(sourcePath)).isDirectory();

    // If it is a folder then the download as zip flag must be true
    if (isFolder && !downloadAsZip) {
      throw new Error("Folder can only be downloaded as zip");
    }

    // extracting the name of folder / file from the given source
    const tempOutputName = sourcePath
      .slice(sourcePath.lastIndexOf("/"))
      .replace("/", "");

    // Updating the name if the folder / file is to be sent as zip
    let outputName = tempOutputName;
    if (downloadAsZip) {
      if (isFolder) {
        outputName += ".zip";
      } else {
        outputName = tempOutputName.split(".")[0] + ".zip";
      }
    }

    let downloadDataStream = null;
    if (downloadAsZip) {
      // Condition for Folder and files with download as zip option true

      // Location to which the zip file will be stored Temporarily
      const tempFileStorage = join(__dirname, "../tempStorage", outputName);
      const output = fs.createWriteStream(tempFileStorage);
      const archive = archiver("zip");
      archive.pipe(output);
      if (isFolder) {
        archive.directory(sourcePath, false);
      } else {
        archive.file(sourcePath, { name: basename(sourcePath) });
      }
      archive.finalize();
      output.on("close", async () => {
        // Set headers for the response
        res.attachment(outputName);

        // Send the zip file as the response
        downloadDataStream = fs.createReadStream(tempFileStorage);
        downloadDataStream.pipe(res);

        await fs.promises.rm(tempFileStorage, { recursive: true });
        console.log("Download Completed");
      });

      // Delete the zip file asynchronously after sending the response
    } else {
      // For Files with download as zip option false
      downloadDataStream =   fs.createReadStream(sourcePath);
      downloadDataStream.pipe(res);
      console.log("Download Completed");
    }
  } catch (err) {
    res.status(400).send({
      ...responseError,
      message: err.message ? err.message : "Error while downloading file",
    });
  }
};
