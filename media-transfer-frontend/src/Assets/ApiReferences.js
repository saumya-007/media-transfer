export const commonApiCongurations = {
  content_type_json: {
    "Content-Type": "application/json;charset=utf-8",
  },
  host: true ? "localhost" : "192.168.1.100",
  port: "4041",
};

// change this to run on different ports
const runOnSamePort = true;

export const directoryApis = {
  get_root_directory: {
    method: "GET",
    headers: commonApiCongurations.content_type_json,
    url: runOnSamePort ? '/directory/getRootDirectory' : `http://${commonApiCongurations.localhost}:${commonApiCongurations.port}/directory/getRootDirectory`,
  },
  get_directory_contents: {
    method: "GET",
    headers: commonApiCongurations.content_type_json,
    url: runOnSamePort ? '/directory/getDirectoryContents' : `http://${commonApiCongurations.localhost}:${commonApiCongurations.port}/directory/getDirectoryContents`,
  },
  create_directory: {
    method: "POST",
    headers: commonApiCongurations.content_type_json,
    url: runOnSamePort ? '/directory/makeDirectory' : `http://${commonApiCongurations.localhost}:${commonApiCongurations.port}/directory/makeDirectory`,
  },
};

export const mediaApis = {
  upload_media: {
    method: "POST",
    url: runOnSamePort ? '/media/upload' : `http://${commonApiCongurations.localhost}:${commonApiCongurations.port}/media/upload`,
  },
  download_media: {
    method: "POST",
    url: runOnSamePort ? '/media/download' : `http://${commonApiCongurations.localhost}:${commonApiCongurations.port}/media/download`,
  },
};
