const formidable = require("formidable");
const { responseError } = require("../utils/constants");

module.exports.handleFormData = (req, res, next) => {
  const form = new formidable.IncomingForm();
  console.log({ form });

  // Set the maximum total file size to 10GB (in bytes)
//   form.options.maxFileSize = 10 * 1024 * 1024 * 1024;
  form.options.maxFields = Infinity;
  form.options.maxFieldsSize = Infinity;
  form.options.maxFileSize = Infinity;
  form.options.maxTotalFileSize = Infinity;

  console.log({ form });

  console.log("maxFileSize:", form.maxFileSize);

  form.parse(req, async (err, fields, files) => {
    console.log(
      "File sizes:",
      Object.values(files).map((file) => file.size)
    );

    if (err) {
      console.error(err);
      res.status(400).send({
        ...responseError,
        message: err.message ? err.message : "Error while uploading file",
      });
      return;
    }

    // Check file sizes
    const maxFileSize = form.maxFileSize;
    for (const key in files) {
      if (files[key].size > maxFileSize) {
        return res.status(413).send({
          ...responseError,
          message: "File size exceeds the allowed limit of 10GB.",
        });
      }
    }

    req.body = {};
    if (fields && Object.keys(fields).length) {
      for (const key in fields) {
        req.body[key] = fields[key][0];
      }
    }
    console.log({ details: files.file });

    req.files = files;
    next();
  });
};
