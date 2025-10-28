import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { isTablet } from '../helpers/isTablet';
import { calcResolution } from '../helpers/calcResolutionDevice';
import Ionicons from '@react-native-vector-icons/ionicons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/StackNavigation';

export const ImagesNotFound = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList, 'SearchResults'>>();

    return (
        <View style={styles.container}>
            <Image 
                source={require('../../../assets/notImages.png')}
                style={styles.image}
            />
            <Text style={styles.textInfo}>No hay imagenes que coincidan con esta busqueda</Text>
            <Pressable
                onPress={() => navigation.goBack()}
                style={({pressed}) => [styles.btnBack, {opacity: pressed ? 0.5 : 1}]}
            >
                <Text style={styles.textBtnBack}>Volver</Text>
                <Ionicons 
                    name='arrow-forward-outline' 
                    color="white" 
                    size={Number(calcResolution({low: 20, medium: 25}))}
                />
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: calcResolution({low:50, medium: 80}),
        width: '100%',
        height: isTablet ? 400 : 300,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 30,
        paddingHorizontal: 20,
    },
    image: {
        maxWidth: isTablet ? 450 : 250,
        maxHeight: isTablet ? 300 : 250,
        objectFit: 'contain', 
    },
    textInfo: {
        fontSize: Number(calcResolution({low:20, medium: 25})),
        textAlign: 'center',
        width: isTablet ? 400 : 300,
        color: '#000'
    },
    btnBack: {
        marginTop: 20,
        backgroundColor: '#000',
        paddingHorizontal: calcResolution({low: 10, medium: 15}),
        paddingVertical: calcResolution({low: 5, medium: 7}),
        flexDirection: 'row',
        alignItems: 'center',
        gap: Number(calcResolution({low: 25, medium: 40})),
        borderRadius: 20,
    },
    textBtnBack: {
        color: '#fff',
        fontSize: Number(calcResolution({low: 15, medium: 17}))
    }
});