export const errorMessage = (code:string) => {
    const errors:Record<string, string> = {
        "ERR_NETWORK":"No hay conexión de internet, conecta el dispositivo a una red"
    }
    return errors[code]??"Error desconocido de petición HTTP";
}