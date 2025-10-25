import axios from "axios";

class AppError extends Error {
    errorCode: string;
    originalError?: unknown;
    constructor(errorCode: string, message: string, originalError?: unknown) {
        super(message);
        this.name = "AppError";
        this.errorCode = errorCode;
        this.originalError = originalError;
        Object.setPrototypeOf(this, AppError.prototype);
    }
}

export const handleError = (error: unknown) => {
    if(axios.isAxiosError(error)) {
        throw new AppError('UNKNOWN_ERROR', 'ERROR DESCONOCIDO', error);
    }
    throw new AppError('UNKNOWN_ERROR', 'ERROR DESCONOCIDO', error);
}
