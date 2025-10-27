import { History } from "../../domain/entities/historyEntity";
import { historyLocalRespository } from "../../domain/repositories/historyLocalRepository";
import { LocalStorage } from "../sources/local/localStorage";

export class HostoryLocalStorageRepositoryImpl implements historyLocalRespository {
    saveLocalStorage(history: History[]): void {

        if(history.length > 20) {
            history = history.slice(0, 21);
        }
        LocalStorage().save(history);
    }
    async getLocalStorage(): Promise<History[]> {
        try {
            return await LocalStorage().get();
        } catch (error) {
            throw error;
        }
    }
    clearHistoryLocalStorage(): void {
        LocalStorage().clear();
    }
    async removeItemLocalStorage(item:string): Promise<History[]> {
        try {
            return await LocalStorage().removeItem(item);
        } catch (error) {
            throw error;
        }
    }
}