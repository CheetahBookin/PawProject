import { RoomImages } from "./hotelTypes";

export type CountryType = {
    country: string;
    flag_url: string;
}

export type CityType = {
    city: string;
}

export type HotelType = {
    id: number;
    name: string;
    images: RoomImages[]
}

export type CountryError = {
    message: string;
}