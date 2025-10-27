import { HostoryLocalStorageRepositoryImpl } from "../../data/repositories/historyLocalStorageRepositoryImpl";
import { History } from "../entities/historyEntity";

const HistoryLocalStorage = new HostoryLocalStorageRepositoryImpl();

const saveHistoryLocalStorageUseCase = (history:History[]):void => {
    HistoryLocalStorage.saveLocalStorage(history);
}

const getHistoryLocalStorageUseCase = async (): Promise<History[]> => {
    try {
        const history = await HistoryLocalStorage.getLocalStorage();
        return history;
    } catch (error) {
        throw new Error("Error al obtener los datos del LocalStorage.");
    }
}

const clearHistoryLocalStorageUseCase = () => {
    HistoryLocalStorage.clearHistoryLocalStorage();
}

const removeItemHistoryLocalStorageUseCase = async (item:string):Promise<History[]> => {
    try {
        return await HistoryLocalStorage.removeItemLocalStorage(item);
    } catch (error) {
        throw new Error("Error al eliminar el item del historial.");
    }
}

export {
    saveHistoryLocalStorageUseCase,
    getHistoryLocalStorageUseCase,
    clearHistoryLocalStorageUseCase,
    removeItemHistoryLocalStorageUseCase
}