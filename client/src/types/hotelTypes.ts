export type HotelTypes = {
    id: number,
    name: string,
    address: string,
    country: string,
    city: string,
    type: string,
    carParkFee: number,
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
    roomNumber: string,
    peopleCapacity: number,
    priceForPerson: number,
    childrenPrice: number
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