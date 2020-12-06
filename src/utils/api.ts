import axios from 'axios';

declare module 'axios' {
    export interface AxiosRequestConfig {
        isAuthRequired?: boolean;
    }
}

const API = axios.create();

API.defaults.baseURL = '/api/v1';

export default API;