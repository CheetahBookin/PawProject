import axios from "axios";

const bookTrip = async (hotelId: number, roomId: number, userId: number, adults: number, children: number, fromDate: string, toDate: string) => {
  try {
    const response = await axios.post("http://localhost:5000/payments/book", {hotelId, roomId, userId, adults, children, fromDate, toDate});
    return response;
  } catch (error: any) {
    return error;
  }
}

const checkout = async (orderId: string, email: string, userId: number) => {
    try {
        const response = await axios.post("http://localhost:5000/payments/checkout", {orderId, email, userId});
        return response;
    } catch (error: any) {
        return error;
    }
}

const checkPaymentStatus = async (orderId: string) => {
    try {
        const response = await axios.post(`http://localhost:5000/payments/status`, {orderId});
        return response;
    } catch (error: any) {
        return error;
    }
}

const cancelReservation = async (orderId: string) => {
    try {
        const response = await axios.post(`http://localhost:5000/payments/cancel`, {orderId});
        return response;
    } catch (error: any) {
        return error;
    }
}

export {
    bookTrip,
    checkout,
    checkPaymentStatus,
    cancelReservation
}