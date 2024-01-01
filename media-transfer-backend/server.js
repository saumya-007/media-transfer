/**
 *    | APIs          | Method | Parameters
 *    ----------------|--------|------------
 *    | Upload Files  | POST   | subFolderPath : if not given take default root file
 *                               file: File to be uploaded
 *    | Create Folder | POST   | location: path of folder in which directory must be created, if not given default is takenfolder_name
 *                               folder_name: name of folder
 *    | Rename Folder | POST   | location: path of folder in which directory to rename is present
 *                               new_name: new name of folder
 */

const express = require("express");
const cors = require("cors");
const config = require("./config/config");
const bodyParser = require('body-parser');

const mediaRoutes = require("./routes/mediaRoutes");
const directoryRoutes = require("./routes/directoryRoutes");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.json({ limit: '100mb' })); 
app.use(express.json()); 
app.use(cors());

app.use("/media",  mediaRoutes);
app.use("/directory",  directoryRoutes);

const port =
  process.env.PORT || process.argv[2] || config.serverConfig.defaultPort;
app.listen(port, (error) =>
  error
    ? console.info("Error In Starting The Service", error)
    : console.info(
        `Service Started on ${config.serverConfig.defaultHost}:${port}`
      )
);
