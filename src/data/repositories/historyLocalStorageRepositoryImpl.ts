import { History } from "../../domain/entities/historyEntity";
import { historyLocalRespository } from "../../domain/repositories/historyLocalRepository";
import { LocalStorage } from "../sources/local/localStorage";

export class HostoryLocalStorageRepositoryImpl implements historyLocalRespository {
    saveLocalStorage(history: History[]): void {
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
    removeItemLocalStorage(): void {
        
    }
}