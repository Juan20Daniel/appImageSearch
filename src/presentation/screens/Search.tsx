import { useEffect, useRef, useState } from "react";
import { InputSearch } from "../components/InputSearch";
import { Keyboard, Pressable, Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SearchHistory } from "../components/SearchHistory";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/StackNavigation";

export const Search = () => {
    const [ isFocus, setIsFocus ] = useState(true);
    const [ heightKeyboard, setHeightKeyboard ] = useState(0);
    const [ heightInputSearch, setHeightInputSearch ] = useState(0);
    const { top } = useSafeAreaInsets();
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
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
        })
        return () => {
            showKeyboard.remove();
            hideKeyboard.remove();
        }
    },[]);
    return (
        <View style={{marginTop: top, flex: 1, backgroundColor: '#ffffff'}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10}}>
                <InputSearch 
                    focus={isFocus}
                    inputRef={inputRef}
                    onFocus={() => setIsFocus(true)}
                    setHeightInputSearch={setHeightInputSearch}
                />
                <Pressable onPress={() => navigation.navigate('Home')} style={{backgroundColor: 'red'}}>
                    <Text>Bacl</Text>
                </Pressable>
            </View>
            <SearchHistory 
                heightKeyboard={heightKeyboard}
                heightInputSearch={heightInputSearch}
            />
        </View>
    );
}