import axios from "axios";
import {actionsOnError} from "@/api/interceptors.js";

const api = axios.create({
  baseURL: "/",
  withCredentials: true,
  headers: {
    "Cache-Control": "no-cache",
    "X-Requested-With": "XMLHttpRequest",
    version: getVersion(),
  },
});

// if(process.env.DEBUGGING)
//   api.defaults.withXSRFToken = true;
api.interceptors.response.use(
    (response) => {
      return Promise.resolve(response);
    },
    (error) => {
      actionsOnError[error.response.status]?.(error);

      return Promise.reject(error);
    }
);

function getVersion() {
  let meta = document.querySelector('meta[name="version"]');

  if (meta) return meta.getAttribute("content");

  return import.meta.env.VITE_APP_VERSION;
}

export { api };
