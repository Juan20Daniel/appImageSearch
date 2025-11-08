import Ionicons from '@react-native-vector-icons/ionicons';
import { DimensionValue, StyleSheet, TouchableOpacity } from 'react-native';
import { calcResolution } from '../helpers/calcResolutionDevice';
import { isTablet } from '../helpers/isTablet';

interface Props {
    bottom?: DimensionValue;
    disabled?: boolean;
    action: () => void;
}

export const BtnFloat = ({bottom, disabled=true,  action}:Props) => {
    return (
        <TouchableOpacity 
            style={{...styles.container, bottom:bottom??0, backgroundColor: disabled ? '#dadadaff' : '#1A66AC'}} 
            onPress={() => {
                if(disabled) return;
                action();
            }}
        >
            <Ionicons 
                name='search-outline'
                size={Number(calcResolution({low: 20, medium:isTablet ? 35 : 25}))}
                color="#fff"
            />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        right: 10,
        backgroundColor: '#1A66AC',
        padding: Number(calcResolution({low: 8, medium: 9})),
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
});