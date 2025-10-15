import { Text } from "react-native";
import { Container } from "../components/Container";
import { useEffect } from "react";
import { getImagesUseCase } from "../../domain/useCases/getImagesUseCase";

export const Home = () => {
    useEffect(() => {
        getImages();
    }, []);
    const getImages = async () => {
        try {
            const response = await getImagesUseCase();
            console.log(response);
        } catch (error) {
            const errorMessage = (error as Error).message;
            console.log(errorMessage);
        }
    }
    return (
        <Container>
            <Text>Buscador de imagenes</Text>
        </Container>
    );
}