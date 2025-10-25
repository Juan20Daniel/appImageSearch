import { useEffect, useRef, useState, useCallback } from "react";
import { Keyboard, StyleSheet, TextInput, useWindowDimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { InputSearch } from "../components/InputSearch";
import { SearchHistory } from "../components/SearchHistory";
import { BtnGoBack } from "../components/BtnGoBack";
import { BtnFloat } from "../components/BtnFloat";
import { getHistoryLocalStorageUseCase, saveHistoryLocalStorageUseCase } from "../../domain/useCases/historyLocalStorageUseCase";
import { History } from "../../domain/entities/historyEntity";
import { NavigationProp, useFocusEffect, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/StackNavigation";

export const Search = () => {
    const [ isFocus, setIsFocus ] = useState(true);
    const [ heightKeyboard, setHeightKeyboard ] = useState(0);
    const [ heightInputSearch, setHeightInputSearch ] = useState(0);
    const [ history, setHistory ] = useState<History[]>([]);
    const [ valueToSearch, setValueToSearch ] = useState('');
    const { top } = useSafeAreaInsets();
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const height = useWindowDimensions().height;
    const inputRef = useRef<TextInput>(null);
   
    useFocusEffect(
        useCallback(() => {
            const getHistory = async () => {
                const history = await getHistoryLocalStorageUseCase();
                setHistory(history);
                inputRef.current?.focus();
            }
            getHistory();
        },[])
    )
    useEffect(() => {
        const showKeyboard = Keyboard.addListener('keyboardDidShow', (event) => {
            setHeightKeyboard(event.endCoordinates.height);
            setIsFocus(true);
        });
        const hideKeyboard = Keyboard.addListener('keyboardDidHide', (event) => {
            setHeightKeyboard(event.endCoordinates.height);
            inputRef.current?.blur();
            setIsFocus(false);
        });
        return () => {
            showKeyboard.remove();
            hideKeyboard.remove();
        }
    },[]);
   
    const search = () => {
        if(valueToSearch.length <= 3) return;
        const newSearch:History = { value:valueToSearch }
        saveHistoryLocalStorageUseCase([newSearch, ...history]);
        setValueToSearch('');
        navigation.navigate('SearchResults', {valueToSearch});
    }
    return (
        <View style={{...styles.container, marginTop: top, height: height-heightKeyboard}}>
            <View style={styles.boxSearch}>
                <InputSearch
                    focus={isFocus}
                    inputRef={inputRef}
                    value={valueToSearch}
                    setValue={setValueToSearch}
                    onFocus={() => setIsFocus(true)}
                    setHeightInputSearch={setHeightInputSearch}
                />
                <BtnGoBack />
            </View>
            {history.length >=1 &&
                <SearchHistory
                    heightKeyboard={heightKeyboard}
                    heightInputSearch={heightInputSearch}
                    history={history}
                />
            }
            <BtnFloat
                action={() => search()}
                bottom={100}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        backgroundColor: '#ffffff'
    },
    boxSearch: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10
    }
});