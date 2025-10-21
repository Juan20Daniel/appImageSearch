import { Pressable, StyleSheet, Text, View } from 'react-native';
import { calcResolution } from '../helpers/calcResolutionDevice';
import Ionicons from '@react-native-vector-icons/ionicons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/StackNavigation';
import { getHeightPercentage, getWidthPercentage } from '../helpers/calcPercentage';
import { isTablet } from '../helpers/isTablet';

export const BtnGoToSearchScreen = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    return (
        <View style={styles.container}>
            <Pressable 
                onPressIn={() => navigation.navigate('Search')}
                collapsable={false}
                style={({pressed}) => ([
                    styles.btnSearch,
                    {backgroundColor: pressed ? '#d8d8d8ff' : 'white' }
                ])}
            >
                <Text style={styles.btnText}>Buscar imagenes</Text>
                <Ionicons 
                    name='search-outline' 
                    size={Number(calcResolution({low:20, medium: 25}))} 
                    color='#b8b8b8ff'
                />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: getWidthPercentage(100),
        height: getHeightPercentage(isTablet ? 7 : 9),
        backgroundColor: 'rgba(255, 255, 255, 0.75)',
        alignItems: 'center',
        justifyContent: 'center',   
    },
    btnSearch: {
        backgroundColor: 'white',
        width: getWidthPercentage(80),
        height: getHeightPercentage(isTablet ? 5 : 7),
        borderRadius: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: getHeightPercentage(2),
        borderWidth: 1,
        borderColor: '#E0E0E0'
    },
    btnText: {
        fontFamily: "Roboto-Light",
        fontSize: Number(calcResolution({low:14, medium: 17})),
        color: 'gray'
    }
});