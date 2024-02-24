import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getAllUnpaidReservations = async (userId: number) => {
    try{
        if (!userId) {
            return "Missing required information"
        }
        const reservations = await prisma.orders.findMany({
            where: {
                AND: [
                    {
                        userId: userId
                    },
                    {
                        paid: false
                    }
                ]
            }
        });
        return reservations;
    }catch(error){
        console.error("Error fetching reservations:", error);
    }
}

const cancelReservation = async (orderId: number) =>{
    try{
        if (!orderId) {
            return "Missing required information"
        }
        const order = await prisma.orders.findUnique({
            where: {
                id: orderId
            }
        });
        if(!order){
            return "Order not found";
        }
        if(order.paid){
            return "Order already paid";
        }
        await prisma.orders.delete({
            where: {
                id: orderId
            }
        });
        return "Reservation cancelled";
    }catch(error){
        console.error("WebSocket error:", error);
    }
}

export {
    cancelReservation,
    getAllUnpaidReservations
}