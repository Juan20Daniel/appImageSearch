import { Image } from "../../domain/entities/imageEntity";
import { ImageRepository } from "../../domain/repositories/imageRepositorie";
import { ImageMapper } from "../models/imageMapper";
import { ImageApiResponse, UnsplashAPIResponse } from "../models/unsplashApiResponse";
import { axiosInstance } from "../sources/remote/api/axios/instance";
const error = {
    code:"ERR_LIMIT_EXCEEDED",
    message: "Límite de busquedas excedido. Espere 1 hora para continuar buscando."
};
const verifyRateLimit = async (ratelimitRemaining:number) => {
    if(ratelimitRemaining > 5) return true;
    
    throw error;
}

export class ImageRepositoryImplement implements ImageRepository {
    async getImages(page=1, offset=20): Promise<Image[]> {
        try {
            const response = await axiosInstance.get<ImageApiResponse[]>('/photos', {
                params: {
                    per_page: offset,
                    page: page
                }
            });
            console.log(response)
            console.log('x-ratelimit-remaining: ', response.headers['x-ratelimit-remaining']);
            await verifyRateLimit(Number(response.headers['x-ratelimit-remaining']));
            return response.data.map(imageItem => {
                return ImageMapper.fromUnsplashAPIResponseToImageEntity(imageItem); 
            });
        } catch (error) {
            throw error;
        }
    }
    async searchImages(query: string, page=1, offset=20): Promise<{images:Image[], total:number}> {
        try {
            const response = await axiosInstance.get<UnsplashAPIResponse>('/search/photos', {
                params: {
                    per_page: offset,
                    page: page,
                    query: query
                }
            });
            await verifyRateLimit(Number(response.headers['x-ratelimit-remaining']));
            console.log('x-ratelimit-remaining: ', response.headers['x-ratelimit-remaining']);
            
            const images = response.data.results.map(imageItem => {
                return ImageMapper.fromUnsplashAPIResponseToImageEntity(imageItem);
            });
            return {
                images: images,
                total: response.headers['x-total'] ? Number(response.headers['x-total']) : 0
            }
        } catch (error) {
            console.log(error); 
            throw error;
        }
    }
}