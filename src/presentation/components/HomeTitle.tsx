import { StyleSheet, Text, View } from 'react-native';
import { getHeightPercentage, getWidthPercentage } from '../helpers/calcPercentage';
import { isTablet } from '../helpers/isTablet';

export const HomeTitle = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Image APP
            </Text>
            <Text style={styles.textInfo}>Explora imágenes premium relacionadas en iStock | Ahorra un 20 % con el código UNSPLASH20</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: getHeightPercentage(15),
        marginBottom: getHeightPercentage(10),
        width: getWidthPercentage(100),
    },
    title: {
        width: getWidthPercentage(80),
        fontFamily: 'Roboto-Light',
        fontSize: getWidthPercentage(isTablet ? 5 : 10),
        textAlign: 'center',
    },
    textInfo: {
        textAlign: 'center',
        fontFamily: 'Roboto-Light',
        width: getWidthPercentage(isTablet ? 60 : 90),
        fontSize: getWidthPercentage(isTablet ? 2 : 4),
        marginTop: getHeightPercentage(1),
    }
});