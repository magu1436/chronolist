import Axios from "axios";

const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL;

const axios = Axios.create({
    baseURL: API_BASE_URL + "app/",
});

export default axios;