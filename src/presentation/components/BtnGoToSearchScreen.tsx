import { Pressable, StyleSheet, Text, View } from 'react-native';
import { calcResolution } from '../helpers/calcResolutionDevice';
import Ionicons from '@react-native-vector-icons/ionicons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/StackNavigation';
import { getHeightPercentage, getWidthPercentage } from '../helpers/calcPercentage';

export const BtnGoToSearchScreen = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    return (
        <View style={styles.container}>
            <Pressable 
                onPress={() => navigation.navigate('Search')}
                style={({pressed}) => ([
                    styles.btnSearch,
                    {backgroundColor: pressed ? '#d8d8d8ff' : 'white' }
                ])}
            >
                <Text style={styles.btnText}>Buscar imagenes</Text>
                <Ionicons 
                    name='search-outline' 
                    size={calcResolution({low:10, medium: 25})} 
                    color='#b8b8b8ff'
                />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: getHeightPercentage(7),
        backgroundColor: 'rgba(255, 255, 255, 0.75)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnSearch: {
        backgroundColor: 'white',
        width: getWidthPercentage(80),
        height: getHeightPercentage(5),
        borderRadius: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: getHeightPercentage(2),
        borderWidth: 1,
        borderColor: '#E0E0E0'
    },
    btnText: {
        fontFamily: "Roboto-Light",
        fontSize: calcResolution({low:14, medium: 17}),
        color: 'gray'
    }
});