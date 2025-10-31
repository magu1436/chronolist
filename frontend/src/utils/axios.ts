import Axios from "axios";

const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL;
if (!API_BASE_URL) throw new Error('Not found the environment variable: "VITE_API_BASE_URL". Check the value of "env" in "launch.json".');

const axios = Axios.create({
    baseURL: API_BASE_URL + "app/",
});

export default axios;