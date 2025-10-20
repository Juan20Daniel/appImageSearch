import { StyleSheet, View } from 'react-native';
import { Image } from '../../domain/entities/imageEntity';
import { getWidthPercentage } from '../helpers/calcPercentage';
import { ImageItem } from './ImageItem';
import { ListImageSkeletor } from './ListImageSkeletor';

interface Props {
    isLoading: boolean;
    images: Image[];
}

export const ListImages = ({isLoading, images}:Props) => {
    return (
        <View style={styles.container}>
            {images.map((image, index) => (
                <ImageItem
                    key={image.id+`-${index}`}
                    image={image} 
                />
            ))}
            {isLoading &&
                <ListImageSkeletor />
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: getWidthPercentage(7),
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingBottom: getWidthPercentage(15),
    }
});