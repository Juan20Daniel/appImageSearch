import { StyleSheet, TextInput, View } from 'react-native';
import { getHeightPercentage, getWidthPercentage } from '../helpers/calcPercentage';
import { isTablet } from '../helpers/isTablet';
import { calcResolution } from '../helpers/calcResolutionDevice';
import { Dispatch, SetStateAction } from 'react';
import Ionicons from '@react-native-vector-icons/ionicons';

interface Props {
    focus: boolean;
    inputRef: React.RefObject<TextInput | null>;
    value: string;
    setValue: React.Dispatch<SetStateAction<string>>;
    onFocus: () => void;
    setHeightInputSearch: Dispatch<SetStateAction<number>>;
}

export const InputSearch = ({focus, inputRef, value, setValue, onFocus, setHeightInputSearch}:Props) => {
    return (
        <View 
            style={styles.container} 
            onLayout={(e) => {
                const { height } = e.nativeEvent.layout;
                setHeightInputSearch(height);
            }}
        >
            <View style={{...styles.boxInputSearch, backgroundColor: focus ? '#d8d8d898' : '#ffffff'}}>
                <View style={{...styles.fontInput, borderColor: focus ? '#0286dfff' : '#bebebeff'}}>
                    <TextInput
                        ref={inputRef}
                        placeholder="Buscar imagenes"
                        autoFocus
                        value={value}
                        onChangeText={setValue}
                        keyboardType="default"
                        autoComplete="off"
                        style={styles.input}
                        onFocus={() => onFocus()}
                    />
                </View>
                <View style={styles.boxIconSearch}>
                    <Ionicons
                        name='search-outline'
                        size={Number(calcResolution({low: 15, medium: 20}))}
                        color='#9e9e9eff'
                    />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        width: getWidthPercentage(isTablet ? 90 : 80),
        height: getHeightPercentage(isTablet ? 6 : 8),
        justifyContent: 'center',
    },
    boxInputSearch: {
        width: '100%',
        height: calcResolution({low:40, medium:50}),
        borderRadius: 20,
        padding: 3,
    }, 
    fontInput: {
        position: 'relative',
        width: '100%',
        height:  calcResolution({low:35, medium:44}),
        borderWidth: 2,
        backgroundColor: '#fff',
        borderRadius: 20,
        justifyContent: 'center'
    },
    input: {
        position: 'absolute',
        width: '100%',    
        borderRadius: 20,
        paddingLeft: Number(calcResolution({low: 15, medium: isTablet ? 20 : 15})),
        paddingRight: 50,
        height: 19,
        paddingVertical: 0,
        fontSize: Number(calcResolution({low: 9, medium: 14})),
        paddingTop: isTablet ? 5 : 0,
        fontFamily:'Roboto-Light',
        zIndex: 2,
        
    },
    boxIconSearch: {
        position: 'absolute',
        right: 10,
        height: '100%',
        width: isTablet ? 50 : 40,
        paddingTop: 5,
        justifyContent: 'center',
        alignItems: 'center'
    }
})