import { useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet, View, RefreshControl } from "react-native";
import { Container } from "../components/Container";
import { getImagesUseCase } from "../../domain/useCases/imagesUseCase";
import { BtnGoToSearchScreen } from "../components/BtnGoToSearchScreen";
import { HomeSubTitle } from "../components/HomeSubTitle";
import { Image } from "../../domain/entities/imageEntity";
import { HomeTitle } from "../components/HomeTitle";
import { ImageItem } from "../components/ImageItem";
import { getWidthPercentage } from "../helpers/calcPercentage";
import { ListImageSkeletor } from "../components/ListImageSkeletor";
import { Alert } from "../components/Alert";
import { handleError } from "../helpers/handleError";
import { Error } from "../types/Error";
import { ErrorIlustration } from "../components/ErrorIlustration";
import { Empty } from "../components/Empty";
import { ShowFullImage } from "../components/ShowFullImage";

interface CustomComponent {
    id:string;
    name: string;
}

type MixedGrid = (Image|CustomComponent)[][];

export const Home = () => {
    const [ homeData, setHomeData ] = useState<MixedGrid>([
        [{id:'app-name', name:'app-name'}],
        [{id:'btn-search', name:'btn-search'}],
        [{id:'sub-title', name:'sub-title'}]
    ]);
    const [ alert, setAlert ] = useState({visible:false, title:'', message:''});
    const [ error, setError ] = useState<Error>({status:false, code:null});
    const [ isLoading, setIsLoading ] = useState(true);
    const [ isRefreshing, setIsRefreshing ] = useState(false);
    const [ showImage, setShowImage ] = useState({visible:false, url:''});
    const counter = useRef(0);

    useEffect(() => {
        getImages();
    }, []);

    const getImages = async () => {
        try {
            setIsLoading(true);
            counter.current = counter.current+1;
            const response = await getImagesUseCase(counter.current);
            const result:Image[][] = formatData(response);
            setHomeData((preState) => ([...preState, ...result]));
            setError({status:false, code:null});
        } catch (error) {
            const err = handleError(error);
            setAlert({
                visible:true, 
                title:'Error al cargar las imagenes', 
                message:err.message
            });
            setError({status:true, code:err.errorCode});
        } finally {
            setIsRefreshing(false);
            setIsLoading(false);
        }
    }
    const formatData = (data:Image[]):Image[][] => {
        if(!data.length) return [];
        const itemsByGroup = 2;
        const result:Image[][] = [];
        for(let i=0; i<=data.length-1; i++) {
            const index = Math.floor(i / itemsByGroup);
            if(!result[index]) {
                result[index] = [data[i]]
            } else {
                result[index].push(data[i]);
            }
        }
        return result;
    }
    const onRefresh = () => {
        setHomeData([
            [{id:'app-name', name:'app-name'}],
            [{id:'btn-search', name:'btn-search'}],
            [{id:'sub-title', name:'sub-title'}]
        ]);
        setIsRefreshing(true);
        counter.current = 0;
        getImages();
    }
    return (
        <>
            <Container>
                <FlatList 
                    data={homeData}
                    onEndReached={() => {
                        if(homeData.length < 4 || isLoading || error.status) return;
                        getImages();
                    }}
                    refreshControl={
                        <RefreshControl 
                            refreshing={isRefreshing}
                            progressViewOffset={100}
                            onRefresh={onRefresh}
                        />
                    }
                    onEndReachedThreshold={0.2}
                    style={styles.content}
                    keyExtractor={(_, index) => `${index}`}
                    showsVerticalScrollIndicator={false}      
                    ListFooterComponent={
                        isLoading 
                            ?   <ListImageSkeletor />
                            :   error.status
                                    ?   <ErrorIlustration errorCode={error.code!}  />
                                    :   (homeData.length <= 3)
                                            ?   <Empty />
                                            :   <View />
                    }
                    renderItem={({item}) => {
                        if(item[0].id === 'app-name') return <HomeTitle />
                        if(item[0].id === 'btn-search') return <BtnGoToSearchScreen />
                        if(item[0].id === 'sub-title') return <HomeSubTitle />
                        return (
                            <View style={styles.row}>
                                {item.map((data, index) => {
                                    const image = data as Image;
                                    return (
                                        <ImageItem 
                                            key={`${data.id} - ${index}`}
                                            image={image}
                                            onPress={(url) => setShowImage({visible:true, url:url})}  
                                        />
                                    );
                                })}
                            </View>
                        );
                    }}
                    stickyHeaderIndices={[1]}
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
    content: {
        paddingBottom: 50,
    },
    row: {
        width: getWidthPercentage(100),
        flexDirection: 'row',
        flexWrap: 'wrap'
    }
});