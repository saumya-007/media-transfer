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
        await archive.finalize();
        // output.on("close", async () => {
        //   // Set headers for the response
        res.attachment(outputName);
        res.set("Content-Type", "application/zip");
  
        // Send the zip file as the response
        console.log({ res });
        downloadDataStream = fs.createReadStream(tempFileStorage);
        downloadDataStream.pipe(res);
  
        //   await fs.promises.rm(tempFileStorage, { recursive: true });
        //   console.log("Download Completed");
        // });
  
        // Need to implement: Delete the zip file asynchronously after sending the response
      } else {
        // For Files with download as zip option false
        downloadDataStream = fs.createReadStream(sourcePath);
        downloadDataStream.pipe(res);
        console.log("Download Completed");
      }
    } catch (err) {
      console.log(err);
      res.status(400).send({
        ...responseError,
        message: err.message ? err.message : "Error while downloading file",
      });
    }
  };
  