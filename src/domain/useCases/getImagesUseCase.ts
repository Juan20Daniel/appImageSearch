import { ImageRepositoryImplement } from "../../data/repositories/imageRepositoryImp";

const ImageRepository = new ImageRepositoryImplement();

export const getImagesUseCase = async (page:number) => {
    return await ImageRepository.getImages(page);
}