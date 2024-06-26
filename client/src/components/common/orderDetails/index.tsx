import { useToast } from '@/components/ui/use-toast';
import React, { useReducer, useState } from "react";

type OrderDetailsProps = {
  setSelectedRoom: React.Dispatch<React.SetStateAction<number | null>>;
  setOrderDetails: React.Dispatch<React.SetStateAction<{
    hotelId: number;
    roomId: number;
    userId: number | undefined;
    adults: number;
    children: number;
    fromDate: string;
    toDate: string;
    carParkFee: number;
  }>>;
  roomId: number;
  hotelId: number;
  capacity: number;
  orderDetails: {
    hotelId: number;
    roomId: number;
    userId: number | undefined;
    adults: number;
    children: number;
    fromDate: string;
    toDate: string;
    carParkFee: number;
  };
  userId: number | undefined;
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  carParkFee: number;
};

type CounterAction =
  | { type: "INCREMENT"; target: "adults" | "children" }
  | { type: "DECREMENT"; target: "adults" | "children" };

function OrderDetails({ setSelectedRoom, roomId, hotelId, capacity, setOrderDetails, orderDetails, userId, setSuccess, carParkFee }: OrderDetailsProps) {
    const counterReducer = (
        state: { adults: number; children: number },
        action: CounterAction
      ) => {
        switch (action.type) {
          case "INCREMENT":
            return {
              adults:
                action.target === "adults"
                  ? Math.min(state.adults + 1, capacity - state.children)
                  : state.adults,
              children:
                action.target === "children"
                  ? Math.min(state.children + 1, capacity - state.adults)
                  : state.children,
            };
          case "DECREMENT":
            return {
              adults:
                action.target === "adults" ? Math.max(state.adults - 1, 0) : state.adults,
              children:
                action.target === "children"
                  ? Math.max(state.children - 1, 0)
                  : state.children,
            };
          default:
            return state;
        }
    };
    const [error, setError] = useState<string | null>(null);
    const [counters, dispatchCounters] = useReducer(counterReducer, {
      adults: 0,
      children: 0,
    });
    const { toast } = useToast();

  const handleClose = () => {
    setSelectedRoom(0);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setOrderDetails({
        ...orderDetails,
        [e.target.name]: e.target.value,
      });
  };

  const dataValidation = (adults: number, children: number, from: string, to: string) => {
    if (adults <= 0){
        return "There must be at least one adult on the trip"
    }else if(from === "" || to === ""){
        return "You need to fill the dates"
    }else if(from > to){
        return "The start date cannot be later than the end date"
    }else if(adults + children > capacity){
        return "You cannot book a trip for more people than the room capacity"
    }else if(from < new Date().toISOString().split('T')[0]){
        return "You cannot book a trip in the past"
    }
    return true;
  }

  const handleBookTrip = () =>{
    const validation = dataValidation(counters.adults, counters.children, orderDetails.fromDate, orderDetails.toDate);
    if(validation !== true){
        setError(validation);
        return;
    }
    setError(null);
    setOrderDetails({
        ...orderDetails,
        hotelId,
        roomId,
        userId: userId || undefined,
        adults: counters.adults,
        children: counters.children,
        carParkFee: carParkFee
    });
    toast({
        title: "Success",
        description: "Data set successfully, now you can book the trip",
        variant: "success"
    })
    setSuccess(true);
  }
  return (
    <div className="bg-gray-200 border border-gray-300 p-4 rounded-lg shadow-md flex justify-between dark:bg-background">
      <div className="flex flex-col">
        <div className="flex items-center">
          <p className="text-lg mr-4 dark:text-font-dark-mode">Adults: {counters.adults}</p>
          <button
            className="bg-brand-primary text-white rounded-lg w-8 h-8 mr-4 dark:bg-brand-primary-dark"
            onClick={() =>
              dispatchCounters({ type: "INCREMENT", target: "adults" })
            }
          >
            +
          </button>
          <button
            className="bg-brand-primary text-white rounded-lg w-8 h-8 mr-4 dark:bg-brand-primary-dark"
            onClick={() =>
              dispatchCounters({ type: "DECREMENT", target: "adults" })
            }
          >
            -
          </button>
        </div>
        <div className="flex items-center mt-4">
          <p className="text-lg mr-4 dark:text-font-dark-mode">Children: {counters.children}</p>
          <button
            className="bg-brand-primary text-white rounded-lg w-8 h-8 mr-4 dark:bg-brand-primary-dark"
            onClick={() =>
              dispatchCounters({ type: "INCREMENT", target: "children" })
            }
          >
            +
          </button>
          <button
            className="bg-brand-primary text-white rounded-lg w-8 h-8 mr-4 dark:bg-brand-primary-dark"
            onClick={() =>
              dispatchCounters({ type: "DECREMENT", target: "children" })
            }
          >
            -
          </button>
        </div>
        <div className="flex items-center mt-4">
          <label htmlFor="fromDate" className="mr-2 dark:text-font-dark-mode">
            From:
          </label>
          <input
            type="date"
            id="fromDate"
            name="fromDate"
            className="border border-gray-300 rounded-md p-1 dark:text-font-dark-mode dark:bg-background dark:border-gray-600 dark:placeholder-font-dark-mode dark:ring-foreground dark:ring-1"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="flex items-center mt-2">
          <label htmlFor="toDate" className="mr-2 dark:text-font-dark-mode">
            To:
          </label>
          <input
            type="date"
            id="toDate"
            name="toDate"
            className="border border-gray-300 rounded-md p-1 dark:text-font-dark-mode dark:bg-background dark:border-gray-600 dark:placeholder-font-dark-mode dark:ring-foreground dark:ring-1"
            onChange={(e) => handleChange(e)}
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md dark:bg-blue-800 dark:text-font-dark-mode" onClick={handleBookTrip}>
          Set your data
        </button>
      </div>
      <div className="flex flex-col items-start">
        <p className="cursor-pointer text-2xl" onClick={handleClose}>
            x
        </p>
      </div>
    </div>
  );
}

export default OrderDetails;
