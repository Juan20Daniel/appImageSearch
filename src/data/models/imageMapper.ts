import { Image } from "../../domain/entities/imageEntity";
import { ImageApiResponse } from "./unsplashApiResponse";

export class ImageMapper {
    static fromUnsplashAPIResponseToImageEntity(apiResponse:ImageApiResponse):Image {
        return {
            id: apiResponse.id,
            url_small: apiResponse.urls.small,
            url_full: apiResponse.urls.full
        }
    }
}