import { HostoryLocalStorageRepositoryImpl } from "../../data/repositories/historyLocalStorageRepositoryImpl";
import { History } from "../entities/historyEntity";

const HistoryLocalStorage = new HostoryLocalStorageRepositoryImpl();

const saveHistoryLocalStorageUseCase = (history:History[]):void => {
    HistoryLocalStorage.saveLocalStorage(history);
}

const getHistoryLocalStorageUseCase = async (): Promise<History[]> => {
    try {
        const history = await HistoryLocalStorage.getLocalStorage();
        console.log(history);
        return history;
    } catch (error) {
        throw new Error("Error al obtener los datos del LocalStorage");
        
    }
}

const clearHistoryLocalStorageUseCase = () => {
    HistoryLocalStorage.clearHistoryLocalStorage();
}

export {
    saveHistoryLocalStorageUseCase,
    getHistoryLocalStorageUseCase,
    clearHistoryLocalStorageUseCase
}