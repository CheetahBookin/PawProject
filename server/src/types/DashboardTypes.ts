export type TripType = {
    id: string;
    userId: number;
    hotelId: number;
    roomId: number;
    adults: number;
    children: number;
    fromDate: Date;
    toDate: Date;
    carParkFee: number;
    fullPrice: number;
    paid: boolean;
    paymentId: string | null;
    createdAt: Date;
    updatedAt: Date;
}