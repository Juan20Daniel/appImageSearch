import { ImageRepositoryImplement } from "../../data/repositories/imageRepositoryImp";

const ImageRepository = new ImageRepositoryImplement();

export const getImagesUseCase = async (page:number) => {
    return await ImageRepository.getImages(page);
}

export const searchImageUseCase = async (query: string, page:number) => {
    return await ImageRepository.searchImages(query, page);
}