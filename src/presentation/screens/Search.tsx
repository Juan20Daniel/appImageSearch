import { useEffect, useRef, useState } from "react";
import { Keyboard, StyleSheet, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { InputSearch } from "../components/InputSearch";
import { SearchHistory } from "../components/SearchHistory";
import { BtnGoBack } from "../components/BtnGoBack";
import { BtnFloat } from "../components/BtnFloat";

export const Search = () => {
    const [ isFocus, setIsFocus ] = useState(true);
    const [ heightKeyboard, setHeightKeyboard ] = useState(0);
    const [ heightInputSearch, setHeightInputSearch ] = useState(0);
    const { top } = useSafeAreaInsets();
    const inputRef = useRef<TextInput>(null);

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
    return (
        <View style={{...styles.container, marginTop: top}}>
            <View style={styles.boxSearch}>
                <InputSearch
                    focus={isFocus}
                    inputRef={inputRef}
                    onFocus={() => setIsFocus(true)}
                    setHeightInputSearch={setHeightInputSearch}
                />
                <BtnGoBack />
            </View>
            <SearchHistory
                heightKeyboard={heightKeyboard}
                heightInputSearch={heightInputSearch}
            />
            <BtnFloat 
                bottom={50}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        flex: 1,
        backgroundColor: '#ffffff'
    },
    boxSearch: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10
    }
});