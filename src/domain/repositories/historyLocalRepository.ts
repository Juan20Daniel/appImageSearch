import { History } from "../entities/historyEntity";

export interface historyLocalRespository {
    saveLocalStorage(history:History[]): void;
    getLocalStorage(): Promise<History[]>;
    clearHistoryLocalStorage():void;
    removeItemLocalStorage(item:string): void;
}