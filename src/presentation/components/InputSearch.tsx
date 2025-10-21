import { StyleSheet, TextInput, View } from 'react-native';
import { getHeightPercentage, getWidthPercentage } from '../helpers/calcPercentage';
import { isTablet } from '../helpers/isTablet';
import Ionicons from '@react-native-vector-icons/ionicons';

interface Props {
    focus: boolean;
    onFocus: () => void;
}

export const InputSearch = ({focus, onFocus}:Props) => {
    return (
        <View style={styles.container}>
            <View style={{...styles.boxInputSearch, backgroundColor: focus ? '#d8d8d898' : '#ffffff'}}>
                <View style={{...styles.fontInput, borderColor: focus ? '#0286dfff' : '#bebebeff'}}>
                    <TextInput 
                        placeholder="Buscar imagenes" 
                        autoFocus
                        keyboardType="default"
                        autoComplete="off"
                        style={styles.input}
                        onFocus={() => onFocus()}
                    />
                </View>
                <View style={styles.boxIconSearch}>
                    <Ionicons 
                        name='search-outline' 
                        size={isTablet ? 25 : 18} 
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
        width: getWidthPercentage(100),
        height: getHeightPercentage(isTablet ? 8 : 10),
        justifyContent: 'center', 
        alignItems: 'center',
    },
    boxInputSearch: {
        width: getWidthPercentage(95),
        height: getHeightPercentage(isTablet ? 5 : 8),
        borderRadius: 20,
        padding: 3,
    }, 
    fontInput: {
        position: 'relative',
        backgroundColor: '#ffffff',
        width: '100%',
        height: '100%',
        borderWidth: 2,
        borderRadius: 20,
    },
    input: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderRadius: 20,
        paddingLeft: isTablet ? 20 : 10,
        paddingRight: isTablet ? 50 : 40,
        fontSize: 17,
        fontFamily:'Roboto-Light',
        zIndex: 2,
    },
    boxIconSearch: {
        position: 'absolute',
        right: isTablet ? 10 : 5,
        height: '100%',
        width: isTablet ? 50 : 35,
        justifyContent: 'center',
        alignItems: 'center'
    }
})