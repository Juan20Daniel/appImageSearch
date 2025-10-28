import axios from "axios";

export enum ErrorCodes {
    ERR_NETWORK = "ERR_NETWORK",
    ERR_BAD_REQUEST = "ERR_BAD_REQUEST",
    UNKNOWN_ERROR = "UNKNOWN_ERROR",
}

const errors: Record<ErrorCodes, string> = {
    [ErrorCodes.ERR_NETWORK]: "No hay conexión de internet, conecta el dispositivo a una red",
    [ErrorCodes.ERR_BAD_REQUEST]: "Hubo un problema al obtener las imagenes, intentalo mas tarde.",
    [ErrorCodes.UNKNOWN_ERROR]: "Error desconocido de petición HTTP"
}

export const errorMessage = (code:string) => 
    errors[code as ErrorCodes] ?? errors[ErrorCodes.UNKNOWN_ERROR]

class AppError extends Error {
    errorCode: string;
    originalError?: unknown;
    constructor(errorCode: string|undefined, message: string, originalError?: unknown) {
        super(message);
        this.name = "AppError";
        this.errorCode = errorCode??ErrorCodes.UNKNOWN_ERROR;
        this.originalError = originalError;
        
        Object.setPrototypeOf(this, AppError.prototype);
    }
}

export const handleError = (error: unknown): AppError => {
    if(axios.isAxiosError(error)) {
        console.log(error.code);
        const code = error.code ?? ErrorCodes.UNKNOWN_ERROR;
        return new AppError(error.code, errorMessage(code), error);
    }
    return new AppError(ErrorCodes.UNKNOWN_ERROR, 'Error desconocido', error);
}