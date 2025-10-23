import Ionicons from '@react-native-vector-icons/ionicons';
import { DimensionValue, StyleSheet, TouchableOpacity } from 'react-native';
import { calcResolution } from '../helpers/calcResolutionDevice';
import { isTablet } from '../helpers/isTablet';

interface Props {
    bottom?: DimensionValue;
}

export const BtnFloat = ({bottom}:Props) => {
    const handlePress = () => {
        console.log('exce')
    }
    return (
        <TouchableOpacity 
            style={{...styles.container, bottom:bottom??'50%'}} 
            onPress={() => handlePress()}
        >
            <Ionicons 
                name='search-outline'
                size={Number(calcResolution({low: 15, medium:isTablet ? 35 : 25}))}
                color="#fff"
            />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        right: 20,
        backgroundColor: '#1A66AC',
        padding: Number(calcResolution({low: 5, medium: isTablet ? 9 : 6})),
        borderRadius: 10,
        shadowColor: "#000000ff",
        shadowOffset: {
        width: 0,
        height: 7,
        },
        shadowOpacity:  0.21,
        shadowRadius: 7.68,
        elevation: 10,

        zIndex: 1,
    }
})