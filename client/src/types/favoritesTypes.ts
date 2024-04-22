import { RoomImages } from "./hotelTypes";

export type Favorite = {
    accommodationId: number;
    createdAt: string;
    id: number;
    updatedAt: string;
    userId: number;
}

export type FavoritesHotels = {
    id: number;
    name: string;
    images: RoomImages[];
}