import { Image } from "../entities/imageEntity";

export interface ImageRepository {
    getImages(): Promise<Image[]>;
}