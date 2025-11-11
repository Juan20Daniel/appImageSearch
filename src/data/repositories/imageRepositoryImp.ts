import { Image } from "../../domain/entities/imageEntity";
import { ImageRepository } from "../../domain/repositories/imageRepositorie";
import { ImageMapper } from "../models/imageMapper";
import { ImageApiResponse, UnsplashAPIResponse } from "../models/unsplashApiResponse";
import { LocalStorage } from "../sources/local/localStorage";
import { axiosInstance } from "../sources/remote/api/axios/instance";
const error = {
    code:"ERR_LIMIT_EXCEEDED",
    message: "Límite de peticiones excedido. Intenta más tarde."
};
const verifyRateLimit = async () => {
    const dateResetLimit = await LocalStorage('date-ratelimit').get<any>();
    console.log('dateResetLimit', dateResetLimit);
    if(dateResetLimit && dateResetLimit > Date.now()) {
        throw error;
    }

    if(dateResetLimit && dateResetLimit < Date.now()) {
        await LocalStorage('reatelimit-remaining').clear();
    }

    const remaning = await LocalStorage('ratelimit-remaining').get<any>();
    console.log('remaning', remaning);
    if(!remaning) return true;
    if(remaning >= 5) return true;

    const resetLimit = Date.now() + 60 * 60 * 1000;
    LocalStorage('date-ratelimit').save(resetLimit);
    throw error;
}

export class ImageRepositoryImplement implements ImageRepository {
    async getImages(page=1, offset=20): Promise<Image[]> {
        try {
            await verifyRateLimit();
            const response = await axiosInstance.get<ImageApiResponse[]>('/photos', {
                params: {
                    per_page: offset,
                    page: page
                }
            });
            console.log('response headers home:', response.headers['x-ratelimit-remaining']);
            LocalStorage('ratelimit-remaining').save(response.headers['x-ratelimit-remaining']);
            return response.data.map(imageItem => {
                return ImageMapper.fromUnsplashAPIResponseToImageEntity(imageItem); 
            });
        } catch (error) {
            throw error;
        }
    }
    async searchImages(query: string, page=1, offset=20): Promise<Image[]> {
        try {
            await verifyRateLimit();
            const response = await axiosInstance.get<UnsplashAPIResponse>('/search/photos', {
                params: {
                    per_page: offset,
                    page: page,
                    query: query
                }
            });
            console.log('response headers search', response.headers['x-ratelimit-remaining']);
            LocalStorage('ratelimit-remaining').save(response.headers['x-ratelimit-remaining']);
            return response.data.results.map(imageItem => {
                return ImageMapper.fromUnsplashAPIResponseToImageEntity(imageItem);
            });
        } catch (error) {
            console.log(error); 
            throw error;
        }
    }
}