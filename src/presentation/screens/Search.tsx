import { useEffect, useState } from "react";
import { InputSearch } from "../components/InputSearch";
import { Keyboard, TouchableWithoutFeedback, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SearchHistory } from "../components/SearchHistory";

export const Search = () => {
    const [ isFocus, setIsFocus ] = useState(true);
    const [ keyboard, setKeyboard ] = useState(true);
    const { top } = useSafeAreaInsets();
    useEffect(() => {
        const showKeyboard = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboard(true);
            setIsFocus(true);
        });
        const hideKeyboard = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboard(false);
            setIsFocus(false);
        })
        return () => {
            showKeyboard.remove();
            hideKeyboard.remove();
        }
    },[]);
    const handleFocus = () => {
        if(keyboard) return;
        setIsFocus(false);
    }
    return (
        <TouchableWithoutFeedback onPress={() => handleFocus()}>
            <View style={{marginTop: top, flex: 1, backgroundColor: '#ffffff'}}>
                <InputSearch 
                    focus={isFocus}
                    onFocus={() => setIsFocus(true)}
                />
                <SearchHistory />
            </View>
        </TouchableWithoutFeedback>
    );
}