import axios from "axios";

const axiosInstance = axios.create({});

const {VITE_ACCESS_TOKEN} = import.meta.env;

const apiConnector = (method, url, bodyData, params, headers) => {
    return axiosInstance({
        method: method,
        url: url,
        data: bodyData ? bodyData : null,
        params: params ? params : null,
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${VITE_ACCESS_TOKEN}`,
            ...headers
        },
    });
};

export default apiConnector;