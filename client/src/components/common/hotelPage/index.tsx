"use client"

import React, { useEffect, useState } from 'react';
import { HotelTypes } from '@/types/hotelTypes';
import OrderDetails from '../orderDetails';
import { useUserContext } from '@/context/userContext';
import { getUser } from '@/services/userService';
import { User } from '@/types/userTypes';
import { useRouter } from 'next/navigation';
import { bookTrip } from '@/services/paymentService';
import { useToast } from '@/components/ui/use-toast';
import { ToastAction } from '@radix-ui/react-toast';
import StarRating from "@/components/common/starRating";
import {getRates} from "@/services/ratingService";

type HotelPageProps = HotelTypes & {
  Rates: any[];
  room: number | null;
};

function HotelPage({ id, name, address, country, city, type, carParkFee, images, Rooms, Rates, room }: HotelPageProps) {
  const [mainImage, setMainImage] = useState(images[0]?.image);
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null);
  const { isLogged, setIsLogged } = useUserContext();
  const [user, setUser] = useState<User | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [rates, setRates] = useState([])
  const { toast } = useToast();

  useEffect(() => {
      const fetchUser = async () => {
        try {
            const userData = await getUser();
            if (userData.status === 200) {
              setUser(userData.data);
              setIsLogged(true);
            } else {
              setIsLogged(false);
            }
        } catch (error: any) {
            console.log(error);
        }
    };
    fetchUser();
  }, [isLogged]);

  useEffect(() => {
    if(room){
      setSelectedRoom(room);
    }
  }, [room])

  const [orderDetails, setOrderDetails] = useState({
    hotelId: 0,
    roomId: 0,
    userId: user?.id,
    adults: 0,
    children: 0,
    fromDate: "",
    toDate: "",
    carParkFee: 0
  });

  const handleRoomSelect = (id: number) => {
    setSelectedRoom(id);
  }
  const router = useRouter();
  const handleBook = async() => {
    if (user) {
      if(success){
        const response = await bookTrip(orderDetails.hotelId, orderDetails.roomId, user.id, orderDetails.adults, orderDetails.children, orderDetails.fromDate, orderDetails.toDate);
        if(response.status === 201){
          toast({
            title: "Success",
            description: "Your trip has been booked successfully",
            variant: "success"
          })
        }else{
          toast({
            title: "Error",
            description: "Something went wrong",
            variant: "destructive"
          })
        }
      }else{
        setSelectedRoom(Rooms[0].id)
      }
    }else{
      toast({
        title: "Error",
        description: "You need to be logged in to book a trip",
        variant: "destructive",
        action: <ToastAction onClick={() => router.push('/login')} altText={''}>Login</ToastAction>
      })
    }
  }

  useEffect(() => {
    const fetchRates = async ()=>{
      try{
        const url = window.location.href
        const url_split = url.split("-")
        const ratesData = await getRates(parseInt(url_split[url_split.length - 1]))
        setRates(ratesData)
      }
      catch (error){
        console.log(error)
      }
    }

    fetchRates()
  }, []);

  const handleRating = async ()=>{
    if(user){

    }
    else {
      toast({
        title: "Error",
        description: "You have to be logged in to rate a hotel",
        variant: "destructive",
        action: <ToastAction onClick={() => router.push('/login')} altText={''}>Login</ToastAction>
      })
    }
  }

  return (
      <>
        <main className="bg-brand-secondary text-black flex">
            <div className="w-1/2 p-16">
              <div>
                <h1 className="text-3xl font-bold mb-4">{name}</h1>
                <p className="mb-2">Address: {address}, {city}, {country}</p>
                <p className="mb-2">Accomodation type: {type}</p>
                <p className="mb-6">Fee for car park: {carParkFee!==0 ? `${carParkFee}zł/day` : `Free of charge`}</p>
              </div>
              <h1>Select your room:</h1>
              <div className="grid grid-cols-1 gap-4 mb-8">
                {Rooms.map((room, index) => (
                  <React.Fragment key={index}>
                    <div key={index} className="bg-brand-primary p-4 rounded-lg shadow-md cursor-pointer" onClick={()=>handleRoomSelect(room.id)}>
                      <p className="font-bold">Room {room.roomNumber}</p>
                      <p>Capacity: {room.peopleCapacity}</p>
                      <p>Price per person: {room.priceForPerson}</p>
                      <p>Children price: {room.childrenPrice}</p>
                      {room.discount && <p>Room discount: {room.discount*100}%</p>}
                    </div>
                    {selectedRoom === room.id && <OrderDetails setSelectedRoom={setSelectedRoom} roomId={room.id} hotelId={id} capacity={room.peopleCapacity} setOrderDetails={setOrderDetails} orderDetails={orderDetails} userId={user?.id} setSuccess={setSuccess} carParkFee={carParkFee}/>}
                  </React.Fragment>
                ))}
              </div>
              <div>
                {Rates.map((rate: any, index: number) => (
                  <div key={index} className="mb-4">
                    <p>{rate.rateName}</p>
                    <p>{rate.price}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-col justify-center items-center mt-8">
                <button className="book-now-button bg-blue-500 text-white px-6 py-3 rounded-full mb-4" onClick={handleBook}>Book now</button>
              </div>
            </div>
            <div className="w-1/2 p-16">
              <h1>Gallery:</h1>
              <div className="mb-8">
                <img src={mainImage} alt={name} className="w-full mb-4 rounded-lg shadow-lg h-[50vh]" />
                <div className="grid grid-cols-3 gap-4">
                  {images.map((image, index) => (
                    <img
                      key={index}
                      src={image.image}
                      alt={name}
                      className={`w-full rounded-lg shadow-sm cursor-pointer h-36 ${image.image === mainImage ? '' : 'opacity-50'}`}
                      onClick={() => setMainImage(image.image)}
                    />
                  ))}
                </div>
              </div>
            </div>
        </main>

        <div className="bg-brand-secondary text-black flex p-16 flex-col">
          <h1 className="text-3xl font-bold mb-4">Rates</h1>
          <div className="flex flex-row">
            <h2 className="text-2xl font-bold mb-1">Rate this hotel and write your comment</h2>
            <StarRating/>
          </div>
          <div className="flex flex-row">
            <textarea className="resize-y w-3/5 h-10 rounded-lg"></textarea>
            <button className="bg-blue-500 text-white px-6 py-3 rounded-full ml-auto" onClick={handleRating}>Post rate</button>
          </div>
          <div>
            {rates.map((rate: any, index: number) => (
                <div key={index} className="mb-4">
                  <p>{rate.rate}</p>
                  <p>{rate.message}</p>
                </div>
            ))}
          </div>
        </div>
      </>
  );
}

export default HotelPage;
