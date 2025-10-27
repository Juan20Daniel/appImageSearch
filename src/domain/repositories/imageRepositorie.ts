import { Image } from "../entities/imageEntity";

export interface ImageRepository {
    getImages(page:number, offset?:number): Promise<Image[]>;
    searchImages(query:string, page:number, offset?:number): Promise<Image[]>;
}