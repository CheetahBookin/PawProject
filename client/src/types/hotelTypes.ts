export type HotelTypes = {
    id: number,
    name: string,
    address: string,
    country: string,
    city: string,
    type: string,
    carParkFee: number,
    flag_url: string,
    images: RoomImages[],
    Rooms: Rooms[]
}

export type HotelTypesShort = {
    id: number,
    name: string,
    address: string,
    country: string,
    city: string,
    type: string,
    carParkFee: number
}

export type RoomImages = {
    image: string
}

export type Rooms = {
    id: number,
    roomNumber: string,
    peopleCapacity: number,
    priceForPerson: number,
    childrenPrice: number
    discount: number
}

export type FullRoom = Rooms & {
    discount: number
    hotelId: number
    id: number
    price: number
    discountedPrice: number
}

export type HotelsTypesTypes = {
    type: string,
    images: RoomImages[]
}

type DiscountedRoomsRooms = {
    roomNumber: string,
    priceForPerson: number,
    discount: number,
    id: number,
    peopleCapacity: number
}

export type DiscountedRooms = {
    name: string,
    country: string,
    city: string,
    id: number,
    images: RoomImages[],
    Rooms: DiscountedRoomsRooms[],
}

export type BestRated = {
    id: number,
    name: string,
    country: string,
    image: string,
    avg_rate: number | null,
    rates_count: number
}