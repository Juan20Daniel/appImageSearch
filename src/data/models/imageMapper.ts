import { Image } from "../../domain/entities/imageEntity";
import { ImageApiResponse } from "./unsplashApiResponse";

export class ImageMapper {
    static fromUnsplashAPIResponseToImageEntity(apiResponse:ImageApiResponse):Image {
        return {
            id: apiResponse.id,
            url: apiResponse.urls.small
        }
    }
}