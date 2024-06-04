export type AvgRate = {
    id: number;
    name: string;
    country: string;
    images: { image: string }[]; // Assuming images is an array of objects with an image property
    Rates: { rate: number }[];   // Assuming Rates is an array of objects with a rate property
}

export type Result = {
    id: number;
    name: string;
    country: string;
    image: string;
    avg_rate: number | null;
    rates_count: number;
}