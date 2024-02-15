import { FullRoom } from "./hotelTypes";

export type SearchResultsForCountryOrCity = {
    countries: string[];
    cities: string[];
}

export type FullSearchResults = {
    result: string[]
}

export type SearchForTrip = {
    destination: string;
    checkInDate: string,
    checkOutDate: string,
    adults: number;
    children: number;
}

export type SearchForTripResults = {
    id: number;
    images: any[];
    address: string;
    city: string;
    country: string;
    name: string;
    nights: number;
    type: string;
    Rooms: FullRoom[]
}