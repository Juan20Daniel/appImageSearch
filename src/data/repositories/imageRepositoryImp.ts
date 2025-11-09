import { Image } from "../../domain/entities/imageEntity";
import { ImageRepository } from "../../domain/repositories/imageRepositorie";
import { ImageMapper } from "../models/imageMapper";
import { ImageApiResponse, UnsplashAPIResponse } from "../models/unsplashApiResponse";
import { LocalStorage } from "../sources/local/localStorage";
import { axiosInstance } from "../sources/remote/api/axios/instance";

export class ImageRepositoryImplement implements ImageRepository {
    async getImages(page=1, offset=20): Promise<Image[]> {
        try {
            const remaning = await LocalStorage('ratelimit-remaining').get<any>();
            console.log('Remaining requests:', remaning);
            if(remaning && remaning < 5) {
                const error = {
                    code:"ERR_LIMIT_EXCEEDED",
                    message: "Límite de peticiones excedido. Intenta más tarde."
                };
                throw error;
            }
            
            const response = await axiosInstance.get<ImageApiResponse[]>('/photos', {
                params: {
                    per_page: offset,
                    page: page
                }
            });
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
            const remaning = await LocalStorage('ratelimit-remaining').get<any>();
            if(remaning && remaning < 5) {
                const error = {
                    code:"ERR_LIMIT_EXCEEDED",
                    message: "Límite de peticiones excedido. Intenta más tarde."
                };
                throw error;
            }
            const response = await axiosInstance.get<UnsplashAPIResponse>('/search/photos', {
                params: {
                    per_page: offset,
                    page: page,
                    query: query
                }
            });
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