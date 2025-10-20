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









// import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

// interface Options {
//     baseURL: string;
//     params?: Record<string, string>;
// }

// export class HttpAdapter {
//     private axiosInstance: AxiosInstance;

//     constructor(options:Options) {
//         this.axiosInstance = axios.create({
//             baseURL: options.baseURL,
//             timeout: 10000,
//             params: options.params
//         });
//         // this.axiosInstance.interceptors.request.use(
//         // (config) => {
//         //     console.log(config)
//         //     return config;
//         // },
//         // (error) => Promise.reject(error)
//         // );
//     }

//     private handleError(error: unknown): never {
//         if(axios.isAxiosError(error)) {
//             if(error.code == "ERR_NETWORK") {
//                 throw new Error("No hay conexión a internet");
//             }
//             if(error.response) {
//                 throw new Error(
//                     `Error del servidor (${error.response.status}): ${
//                         error.response.statusText || "Error desconocido"
//                     }`
//                 );
//             }
//         }
//         throw new Error("Error desconocido en la petición HTTP");
//     }

//     async get<T>(url: string):Promise<T> {
//         try {
//             const { data } = await this.axiosInstance.get<T>(url);
//             return data;
//         } catch (error) {
//             throw this.handleError(error);
//         }
//     }
// }