import { Image, StyleSheet, View } from 'react-native'
import { isTablet } from '../helpers/isTablet';

export const ErrorNetwork = () => {
    return (
        <View style={styles.container}>
            <Image 
                source={require('../../../assets/connectionLost.png')}
                style={styles.image}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: isTablet ? 300 : 200,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 30,
        paddingHorizontal: 20,
    },
    image: {
        maxWidth: isTablet ? 450 : 250,
        maxHeight: isTablet ? 200 : 150,
        objectFit: 'contain', 
    }
});