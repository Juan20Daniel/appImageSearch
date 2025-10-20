import { Image } from "../../domain/entities/imageEntity";
import { ImageRepository } from "../../domain/repositories/imageRepositorie";
import { ImageMapper } from "../models/imageMapper";
import { ImageApiResponse } from "../models/unsplashApiResponse";
import { handleError } from "../sources/remote/api/axios/error";
import { axiosInstance } from "../sources/remote/api/axios/instance";

export class ImageRepositoryImplement implements ImageRepository {
    async getImages(page=1, offset=20): Promise<Image[]> {
        try {
            const {data} = await axiosInstance.get<ImageApiResponse[]>('/photos', {
                params: {
                    per_page: offset,
                    page: page
                }
            });
            return data.map(imageItem => {
                return ImageMapper.fromUnsplashAPIResponseToImageEntity(imageItem);
            });
        } catch (error) {
            return handleError(error);
        }
    }
}