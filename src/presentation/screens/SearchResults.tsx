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
import { handleError } from '../helpers/handleError';
import { AlertModal } from '../components/AlertModal';
import { StatusError } from '../components/StatusError';
import { ShowFullImage } from '../components/ShowFullImage';

interface Props extends StackScreenProps<RootStackParamList, 'SearchResults'>{}

export const SearchResults = ({route, navigation}:Props) => {
    const [ images, setImages ] = useState<Image[]>([]);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ error, setError ] = useState<Error>({ status:false, code:null });
    
    const [ isRefreshing, setIsRefreshing ] = useState(false);
    const [ alert, setAlert ] = useState({visible:false, title:'', message:''});
    const [ showImage, setShowImage ] = useState({visible:false, url_small:'', url_full:''});
    const { valueToSearch } = route.params;
    const totalImages = useRef<number>(0);
    const counter = useRef<number>(0);
    useLayoutEffect(() => {
        searchImages();
    },[valueToSearch]);
    const searchImages = async () => {
        try {
            setIsLoading(true);
            counter.current = counter.current+1;
            const result = await searchImageUseCase(valueToSearch, counter.current);
            console.log('Total de imagenes encontradas: ', result.total);
            totalImages.current = result.total;
            setImages(preState => ([...preState, ...result.images]));
            setError({status:false, code:null});
        } catch (error) {
            const err = handleError(error);
            counter.current = counter.current-1;
            setAlert({
                visible:true, 
                title:'Error al cargar las imagenes', 
                message:err.message
            });
            setError({status:true, code:err.errorCode});
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
                                    ?   <View style={{width:200, height: 100}} />
                                    :   <StatusError errorCode={error.code!}  />
                    }
                    renderItem={({item}) => (
                        <ImageItem 
                            image={item} 
                            onPress={(url_small, url_full) => setShowImage({visible:true, url_small:url_small, url_full:url_full})}
                        />            
                    )}
                    onEndReached={() => {
                        if(isLoading) return;
                        if(error.status) return;
                        if(images.length >= totalImages.current) return;
                        searchImages();
                    }}
                    onEndReachedThreshold={0.2}
                />
            </Container>
            <ShowFullImage 
                visible={showImage.visible}
                url_small={showImage.url_small} 
                url_full={showImage.url_full} 
                close={() => setShowImage({visible:false, url_small:'', url_full:''})}
            />
            <AlertModal
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