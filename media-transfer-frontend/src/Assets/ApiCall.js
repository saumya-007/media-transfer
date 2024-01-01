import { toast } from "react-toastify";

const defaultErrorMessage = "API Error !";

export const ApiCall = async ({ url, method, config }) => {
  switch (method.toUpperCase()) {
    case "GET":
      try {
        const response = await fetch(url, {
          method: method.toUpperCase(),
          headers: config.headers || {},
          params: config.params || {},
        });
        return response;
      } catch (err) {
        toast.error(err.message ? err.message : defaultErrorMessage);
      }
      break;
    case "POST" || "PUT" || "PATCH":
      try {
        const response = await fetch(url, {
          method: method.toUpperCase(),
          headers: config.headers || {},
          params: config.params || {},
          body: config.body || {},
        });
        return response;
      } catch (err) {
        toast.error(err.message ? err.message : defaultErrorMessage);
      }
      break;
    case "DELETE":
      try {
        await fetch(url, {
          method: method.toUpperCase(),
          headers: config.headers || {},
          params: config.params || {},
          body: config.body || {},
        });
      } catch (err) {
        toast.error(err.message ? err.message : defaultErrorMessage);
      }
      break;
    default:
      return false;
  }
};
