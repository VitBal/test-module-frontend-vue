import axios from "axios";

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

function getVersion() {
  let meta = document.querySelector('meta[name="version"]');

  if (meta) return meta.getAttribute("content");

  return import.meta.env.VITE_APP_VERSION;
}

export { api };
