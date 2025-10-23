import AsyncStorage from "@react-native-async-storage/async-storage";
import { History } from "../../../domain/entities/historyEntity";
const nameLocalStorage = 'history';

//https://www.udemy.com/course/react-native-mvvm-app-delivery-nodejs-mysql-pasarelas-pagos/learn/lecture/34545840#overview

export const LocalStorage = () => {
    const save = async (history:History[]) => {
        try {
            await AsyncStorage.setItem(nameLocalStorage, JSON.stringify(history));
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    const get = async (): Promise<History[]> => {
        try {
            const data = await AsyncStorage.getItem(nameLocalStorage);
            if(!data) return [];
            return JSON.parse(data);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    const clear = async () => {
        try {
            await AsyncStorage.removeItem(nameLocalStorage);
        } catch (error) {
            console.log(error);
            throw error
        }
    }
    const removeItem = async () => {
        try {
            console.log('remove item')    
        } catch (error) {
            console.log(error);
            throw error
        }
    }

    return {
        save,
        get,
        clear,
        removeItem
    }
}