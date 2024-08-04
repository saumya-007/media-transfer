const express = require("express");
const cors = require("cors");
const config = require("./config/config");
const bodyParser = require('body-parser');
const path = require('path')

const mediaRoutes = require("./routes/mediaRoutes");
const directoryRoutes = require("./routes/directoryRoutes");

const app = express();
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use("/media", mediaRoutes);
app.use("/directory", directoryRoutes);

const port =
  process.env.PORT || process.argv[2] || config.serverConfig.defaultPort;
app.listen(port, (error) =>
  error
    ? console.info("Error In Starting The Service", error)
    : console.info(
      `Service Started on ${config.serverConfig.defaultHost}:${port}`
    )
);
