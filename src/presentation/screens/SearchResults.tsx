import { FlatList, StyleSheet, Text, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/StackNavigation';
import { useLayoutEffect, useRef, useState } from 'react';
import { Error } from '../types/Error';
import { searchImageUseCase } from '../../domain/useCases/imagesUseCase';
import { Image } from '../../domain/entities/imageEntity';
import { Container } from '../components/Container';
import { getHeightPercentage, getWidthPercentage } from '../helpers/calcPercentage';
import { isTablet } from '../helpers/isTablet';
import { BtnGoBack } from '../components/BtnGoBack';
import { calcResolution } from '../helpers/calcResolutionDevice';
import { ImageItem } from '../components/ImageItem';
import { ListImageSkeletor } from '../components/ListImageSkeletor';
import { NotImages } from '../components/NotImages';
import { ErrorNetwork } from '../components/ErrorNetwork';
import { handleError } from '../helpers/handleError';

interface Props extends StackScreenProps<RootStackParamList, 'SearchResults'>{}

export const SearchResults = ({route, navigation}:Props) => {
    const [ images, setImages ] = useState<Image[]>([]);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ error, setError ] = useState<Error>({ status:false, code:null });
    const { valueToSearch } = route.params;
    const counter = useRef<number>(0);
    useLayoutEffect(() => {
        searchImages();
    },[valueToSearch]);
    const searchImages = async () => {
        if(error.status) return;
        try {
            setIsLoading(true);
            counter.current = counter.current+1;
            const images = await searchImageUseCase(valueToSearch, counter.current);
            setImages(preState => ([...preState, ...images]));
            console.log(images);
            setError({status:false, code:null});
        } catch (error) {
            const err = handleError(error);
            console.log(err);
            setError({status:true, code:null});
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <Container>
            <View style={styles.navbar}>
                <View style={styles.boxTitle}>
                    <Text style={styles.title}>Resultados de la busqueda</Text>
                </View>
                <BtnGoBack action={() => navigation.goBack()} />
            </View>
            <FlatList 
                data={images}
                keyExtractor={(_, index) => index.toString()}
                numColumns={ isTablet ? 2 : 1}
                ListHeaderComponent={
                    <View style={styles.boxValueToSearch}>
                        <Text style={styles.valueToSearch}>{valueToSearch}</Text>
                    </View>
                }
                ListEmptyComponent={
                    (images.length === 0 && !isLoading)
                        ?   <NotImages />
                        :   <View />
                }
                ListFooterComponent={
                    isLoading
                        ?   <ListImageSkeletor /> 
                        :   !error.status
                                ?   <View />
                                :   error.code === "ERR_NETWORK"
                                        ?   <ErrorNetwork />
                                        :   <ErrorNetwork />
                }
                renderItem={({item}) => (
                    <ImageItem image={item} />            
                )}
                onEndReached={() => {
                    if(isLoading) return;
                    searchImages();
                }}
                onEndReachedThreshold={0.2}
            />
        </Container>
    );
}

const styles = StyleSheet.create({
    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    boxTitle: {
        width: getWidthPercentage(isTablet ? 90 : 80),
        height: getHeightPercentage(isTablet ? 6 : 8),
        justifyContent: 'center',
    },
    title: {
        fontSize: Number(calcResolution({low: 15, medium: 20})),
        fontFamily: 'Roboto-Light'
    },
    boxValueToSearch: {
        paddingHorizontal: 10,
    },
    valueToSearch: {
        fontSize: Number(calcResolution({low: 30, medium: 40})),
        fontFamily: 'Roboto-Bold'
    }
});