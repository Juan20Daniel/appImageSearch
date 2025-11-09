import AsyncStorage from "@react-native-async-storage/async-storage";

export const LocalStorage = (key:string) => {
    const save = async <T,>(valueToSave:T) => {
        try {
            await AsyncStorage.setItem(key, JSON.stringify(valueToSave));
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    const get = async <T,>(): Promise<T> => {
        try {
            const data = await AsyncStorage.getItem(key);
            if(!data) return [] as never;
            return JSON.parse(data);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    const clear = async () => {
        try {
            await AsyncStorage.removeItem(key);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    return {
        save,
        get,
        clear,
    }
}