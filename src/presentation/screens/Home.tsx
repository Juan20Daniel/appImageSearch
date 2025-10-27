import { useEffect, useRef, useState } from "react";
import { FlatList, NativeScrollEvent, NativeSyntheticEvent, StyleSheet, View, RefreshControl } from "react-native";
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
import { ErrorNetwork } from "../components/ErrorNetwork";

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
    const [ isRefreshing, setIsRefreshing ] = useState(false);
    const isLoadingMore = useRef(false);
    const counter = useRef(0);

    useEffect(() => {
        getImages();
    }, []);
    useEffect(() => {
        isLoadingMore.current = false;
    },[homeData]);
    const getImages = async () => {
        try {
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
        }
    }
    const formatData = (data:Image[]):Image[][] => {
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
        setIsRefreshing(true);
        getImages();
    }
    return (
        <>
            <Container>
                <FlatList 
                    refreshControl={
                        <RefreshControl 
                            refreshing={isRefreshing}
                            progressViewOffset={100}
                            onRefresh={onRefresh}
                        />
                    }
                    data={homeData}
                    onEndReached={() => {
                        if(isLoadingMore.current) return;
                        getImages();
                    }}
                    onEndReachedThreshold={0.2}
                    style={styles.content}
                    keyExtractor={(_, index) => `${index}`}
                    showsVerticalScrollIndicator={false}
                    ListFooterComponent={
                        !error.status
                            ?   <ListImageSkeletor />
                            :   error.code === "ERR_NETWORK"
                                    ?   <ErrorNetwork />
                                    :   <ErrorNetwork />
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
                                        />
                                    );
                                })}
                            </View>
                        );
                    }}
                    stickyHeaderIndices={[1]}
                />
            </Container>
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