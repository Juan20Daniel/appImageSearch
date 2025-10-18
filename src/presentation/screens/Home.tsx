import { Container } from "../components/Container";
import { useEffect, useState } from "react";
import { getImagesUseCase } from "../../domain/useCases/getImagesUseCase";
import { BtnGoToSearchScreen } from "../components/BtnGoToSearchScreen";
import { HomeSubTitle } from "../components/HomeSubTitle";
import { Image } from "../../domain/entities/imageEntity";
import { Skeleton } from "../components/Skeletor";
import { ListImages } from "../components/ListImages";
import { ScrollView, View } from "react-native";
import { getHeightPercentage } from "../helpers/calcPercentage";
import { HomeTitle } from "../components/HomeTitle";

export const Home = () => {
    const [ images, setImages ] = useState<Image[]>([]);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ error, setError ] = useState(true);

    useEffect(() => {
        getImages();
    }, []);
    const getImages = async () => {
        try {
            setIsLoading(true);
            const response = await getImagesUseCase();
            setImages(response);
            setError(false);
        } catch (error) {
            const errorMessage = (error as Error).message;
            console.log(errorMessage);
            setError(true);
        }
    }
    return (
        <Container>
            <ScrollView stickyHeaderIndices={[2]}>
                <HomeTitle />
                <View style={{width:'100%', height: getHeightPercentage(10)}} />
                <BtnGoToSearchScreen />
                <HomeSubTitle />
                <ListImages 
                    isLoading={isLoading}
                    images={images}
                />
                {/* <Skeleton width={'50%'} height={300} /> */}
            </ScrollView>

        </Container>
    );
}