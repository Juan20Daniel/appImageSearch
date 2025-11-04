import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';
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
import { ImagesNotFound } from '../components/ImagesNotFound';
import { ErrorNetwork } from '../components/ErrorNetwork';
import { handleError } from '../helpers/handleError';
import { Alert } from '../components/Alert';
import { ErrorIlustration } from '../components/ErrorIlustration';
import { ShowFullImage } from '../components/ShowFullImage';

interface Props extends StackScreenProps<RootStackParamList, 'SearchResults'>{}

export const SearchResults = ({route, navigation}:Props) => {
    const [ images, setImages ] = useState<Image[]>([]);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ error, setError ] = useState<Error>({ status:false, code:null });
    const [ isRefreshing, setIsRefreshing ] = useState(false);
    const [ alert, setAlert ] = useState({visible:false, title:'', message:''});
    const [ showImage, setShowImage ] = useState({visible:false, url:''});
    const { valueToSearch } = route.params;
    const counter = useRef<number>(0);
    useLayoutEffect(() => {
        searchImages();
    },[valueToSearch]);
    const searchImages = async () => {
        try {
            counter.current = counter.current+1;
            const images = await searchImageUseCase(valueToSearch, counter.current);
            setImages(preState => ([...preState, ...images]));
            setError({status:false, code:null});
        } catch (error) {
            const err = handleError(error);
            counter.current = counter.current-1;
            setAlert({
                visible:true, 
                title:'Error al cargar las imagenes', 
                message:err.message
            });
            setError({status:true, code:null});
        } finally {
            setIsLoading(false);
            setIsRefreshing(false);
        }
    }
    const onRefresh = () => {
        setIsRefreshing(true);
        counter.current = 0;
        searchImages();
    }
    return (
        <>
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
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl 
                            refreshing={isRefreshing}
                            progressViewOffset={100}
                            onRefresh={onRefresh}
                        />
                    }
                    ListHeaderComponent={
                        <View style={styles.boxValueToSearch}>
                            <Text style={styles.valueToSearch}>{valueToSearch}</Text>
                        </View>
                    }
                    ListEmptyComponent={
                        (images.length === 0 && !isLoading && !error.status) 
                            ?   <ImagesNotFound />
                            :   <View />
                    }
                    ListFooterComponent={
                        isLoading
                            ?   <ListImageSkeletor /> 
                            :   !error.status
                                    ?   <View />
                                    :   <ErrorIlustration errorCode={error.code!}  />
                    }
                    renderItem={({item}) => (
                        <ImageItem 
                            image={item} 
                            onPress={() => setShowImage({visible:true, url:item.url})}
                        />            
                    )}
                    onEndReached={() => {
                        if(isLoading) return;
                        if(error.status) return;
                        searchImages();
                    }}
                    onEndReachedThreshold={0.2}
                />
            </Container>
            <ShowFullImage 
                visible={showImage.visible}
                url={showImage.url} 
                close={() => setShowImage({visible:false, url:''})}
            />
            <Alert
                visible={alert.visible}
                title={alert.title} 
                message={alert.message}
                closeModal={() => setAlert({visible:false, title:'', message:''})} 
            />
        </>
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