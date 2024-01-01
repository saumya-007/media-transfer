import { directoryApis } from "../../Assets/ApiReferences";
import { ApiCall } from "../../Assets/ApiCall";

export const getRootDirectory = async () => {
  const requestConfig = directoryApis.get_root_directory;
  let response = await ApiCall({
    url: requestConfig.url,
    method: requestConfig.method,
    config: {
      headers: requestConfig.headers,
    },
  });
  return response.json();
};
