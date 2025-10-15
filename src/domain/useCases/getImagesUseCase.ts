import { ImageRepositoryImplement } from "../../data/repositories/imageRepositoryImp";

const ImageRepository = new ImageRepositoryImplement();

export const getImagesUseCase = async () => {
    return await ImageRepository.getImages();
}