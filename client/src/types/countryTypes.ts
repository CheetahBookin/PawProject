import { RoomImages } from "./hotelTypes";

export type CountryType = {
    country: string;
    flag_url: string;
}

export type CityType = {
    city: string;
    images: RoomImages[]
}