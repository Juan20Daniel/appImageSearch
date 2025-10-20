import { Image } from "../entities/imageEntity";

export interface ImageRepository {
    getImages(page:number,offset?:number): Promise<Image[]>;
}