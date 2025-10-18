import { StyleSheet, Text, View } from 'react-native';
import { getHeightPercentage, getWidthPercentage } from '../helpers/calcPercentage';

export const HomeSubTitle = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Consumo de la api de <Text style={{fontFamily:'Roboto-Bold'}}>Unsplash</Text>
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: getHeightPercentage(5)
    },
    title: {
        width: getWidthPercentage(80),
        fontFamily: 'Roboto-Light',
        fontSize: getWidthPercentage(9),
        textAlign: 'center',
    }
});