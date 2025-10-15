import axios from "axios";
const errorMessage = (code:string) => {
    const errors:Record<string, string> = {
        "ERR_NETWORK":"No hay conexión de internet, conecta el dispositivo a una red"
    }
    return errors[code]??"Error desconocido de petición HTTP";
}
export const handleError = (error: unknown) => {
    if(axios.isAxiosError(error)) {
        throw new Error(errorMessage(error.code!));
    }
    throw new Error("Error desconocido de petición HTTP");
}
