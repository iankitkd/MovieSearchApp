import axios from "axios";
const  OWN_API_BASE_URL = import.meta.env.VITE_OWN_API_BASE_URL;

export const OWN_API_URL = `${OWN_API_BASE_URL}/api/movies`;

const axiosInstance = axios.create({});

const apiConnector = (url, region) => {
    if(!url) return;

    return axiosInstance({
        method: "POST",
        url: OWN_API_URL,
        data: {url, region},
        headers: {
            accept: 'application/json',
        },
    });
};

export default apiConnector; 