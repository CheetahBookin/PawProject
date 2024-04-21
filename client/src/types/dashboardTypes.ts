import { HotelTypes } from "./hotelTypes";
import { UserProfileOpinions } from "./ratingTypes";

export type FinishedUpcomingTrips = {
    finished: number;
    upcoming: number;
}

export type MostVisitedDestination = {
    mostVisitedCity: {
        city: string;
        count: number;
    }
    mostVisitedCountry: {
        country: string;
        count: number;
    }
}

export type NextTrip = {
    hotel: HotelTypes[];
}

export type Level = {
    level: string;
}

export type Opinions = {
    numberOfRatings: number;
    ratings: UserProfileOpinions[];
}