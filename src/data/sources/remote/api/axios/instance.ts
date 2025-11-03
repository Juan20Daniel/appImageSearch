import { UNSPLASH_BASE_APIS, UNSPLASH_CLIENT_ID } from "@env";
import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: UNSPLASH_BASE_APIS,
    timeout: 10000,
    params: {
        client_id: UNSPLASH_CLIENT_ID,
    },
    headers: {
        "Content-Type":"application/json"
    }
});