import { Image, Pressable, StyleSheet, View } from 'react-native'
import type { Image as ImageEntity } from '../../domain/entities/imageEntity';
import { getWidthPercentage } from '../helpers/calcPercentage';
import { isTablet } from '../helpers/isTablet';

interface Props {
    image: ImageEntity;
    onPress: (url_small:string, url_full:string) => void;
}

export const ImageItem = ({image, onPress}:Props) => {
    return (
        <Pressable onPress={() => onPress(image.url_small, image.url_full)} style={styles.container}>
            <Image 
                style={styles.image}
                source={{uri:`${image.url_small}`}}
            />
        </Pressable> 
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