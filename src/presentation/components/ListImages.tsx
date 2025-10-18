import { StyleSheet, View } from 'react-native';
import { Image } from '../../domain/entities/imageEntity';
import { getWidthPercentage } from '../helpers/calcPercentage';
import { isTablet } from '../helpers/isTablet';
import { ImageItem } from './ImageItem';

interface Props {
    isLoading: boolean;
    images: Image[];
}

export const ListImages = ({isLoading, images}:Props) => {
    // if(isLoading) {

    // }
    return (
        <View style={styles.container}>
            {images.map(image => (
                <ImageItem 
                    key={image.id}
                    image={image} 
                />
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: getWidthPercentage(5),
        marginTop: getWidthPercentage(7),
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingBottom: getWidthPercentage(15),
    },
    box: {
        width: getWidthPercentage(isTablet ? 45 : 90),
        height: 400,
        padding: 10,
    },
    item: {
        width: '100%',
        height: '100%',
        backgroundColor: '#ebebebff',
        borderRadius: 30,
    }
});