import { Image, StyleSheet, View } from 'react-native'
import type { Image as ImageEntity } from '../../domain/entities/imageEntity';
import { getWidthPercentage } from '../helpers/calcPercentage';
import { isTablet } from '../helpers/isTablet';

interface Props {
    image: ImageEntity;
}

export const ImageItem = ({image}:Props) => {
    return (
        <View style={styles.container}>
            <Image 
                style={styles.image}
                source={{uri:`${image.url}`}}
            />
        </View> 
    );
}

const styles = StyleSheet.create({
    container: {
        width: getWidthPercentage(isTablet ? 50 : 100),
        height: 400,
        padding: 10,
    },
    image: {
        width:'100%', 
        height: '100%', 
        objectFit:'cover', 
        borderRadius: 30
    }
});