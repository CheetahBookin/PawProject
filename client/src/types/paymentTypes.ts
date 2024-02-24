export type Reservation = {
    id: number,
    hotelId: number,
    roomId: number,
    userId: number,
    adults: number,
    children: number,
    fromDate: string,
    toDate: string,
    carParkFee: number,
    fullPrice: number,
    createdAt: string,
    paid: boolean
  }