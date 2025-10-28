import { Image, StyleSheet, Text, View } from 'react-native';
import { isTablet } from '../helpers/isTablet';
import { calcResolution } from '../helpers/calcResolutionDevice';

export const Empty = () => {
    return (
        <View style={styles.container}>
            <Image 
                source={require('../../../assets/notImages.png')}
                style={styles.image}
            />
            <Text style={styles.textInfo}>No hay imagenes para mostrar, intenta recargar la app.</Text>
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
        paddingBottom: 200,
        paddingHorizontal: 20,
    },
    image: {
        maxWidth: isTablet ? 450 : 250,
        maxHeight: isTablet ? 300 : 250,
        objectFit: 'contain', 
    },
    textInfo: {
        fontSize: Number(calcResolution({low:15, medium: isTablet ? 25 : 20})),
        textAlign: 'center',
        width: isTablet ? 400 : 300,
        color: '#000'
    },
});