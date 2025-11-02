import Axios from "axios";

let API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL;
if (!API_BASE_URL) throw new Error('Not found the environment variable: "VITE_API_BASE_URL". Check the value of "env" in "launch.json".');
if (!API_BASE_URL.endsWith("/")) API_BASE_URL += "/";

const axios = Axios.create({
    baseURL: API_BASE_URL + "api/",
});

export default axios;