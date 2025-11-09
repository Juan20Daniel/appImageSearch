import { History } from "../../domain/entities/historyEntity";
import { historyLocalRespository } from "../../domain/repositories/historyLocalRepository";
import { LocalStorage } from "../sources/local/localStorage";

export class HostoryLocalStorageRepositoryImpl implements historyLocalRespository {
    saveLocalStorage(history: History[]): void {
        if(history.length > 20) {
            history = history.slice(0, 21);
        }
        LocalStorage('history').save(history);
    }
    async getLocalStorage(): Promise<History[]> {
        try {
            const result = await LocalStorage('history').get<History[]>();
            return result??[]
        } catch (error) {
            throw error;
        }
    }
    clearHistoryLocalStorage(): void {
        LocalStorage('history').clear();
    }
    async removeItemLocalStorage(item:string) {
        try {
            const history =  await LocalStorage('history').get<History[]>();
            if(!history) return [];
            const newHistory = history.filter(historyItem => historyItem.value !== item);
            await LocalStorage('history').save(newHistory);
            return newHistory;
        } catch (error) {
            throw error;
        }
    }
}