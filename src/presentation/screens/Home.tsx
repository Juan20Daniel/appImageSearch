import { useEffect, useRef, useState } from "react";
import { FlatList, NativeScrollEvent, NativeSyntheticEvent, StyleSheet, Text, View } from "react-native";
import { Container } from "../components/Container";
import { getImagesUseCase } from "../../domain/useCases/getImagesUseCase";
import { BtnGoToSearchScreen } from "../components/BtnGoToSearchScreen";
import { HomeSubTitle } from "../components/HomeSubTitle";
import { Image } from "../../domain/entities/imageEntity";
import { HomeTitle } from "../components/HomeTitle";
import { ImageItem } from "../components/ImageItem";
import { isTablet } from "../helpers/isTablet";
import { getWidthPercentage } from "../helpers/calcPercentage";

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
    const [ isLoading, setIsLoading ] = useState(true);
    const [ error, setError ] = useState(true);
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
            setIsLoading(true);
            counter.current = counter.current+1;
            const response = await getImagesUseCase(counter.current);
            const result:Image[][] = formatData(response);
            setHomeData((preState) => ([...preState, ...result]));
            setError(false);
        } catch (error) {
            const errorMessage = (error as Error).message;
            console.log(errorMessage);
            setError(true);
        } finally {
            setIsLoading(false);
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
    const onScroll = (event:NativeSyntheticEvent<NativeScrollEvent>) => {
        if(isLoadingMore.current) return;
        const {contentOffset, layoutMeasurement,contentSize } = event.nativeEvent;
        const isEndReached = (contentOffset.y + layoutMeasurement.height + 300) >= contentSize.height;
        if(!isEndReached) return;
        isLoadingMore.current=true;
        getImages();
    }
    return (
        <Container>
            <FlatList 
                data={homeData}
                onScroll={onScroll}
                style={styles.content}
                keyExtractor={(_, index) => `${index}`}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => {
                    console.log(item);
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