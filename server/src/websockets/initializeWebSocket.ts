import { Server } from "http";
import { cancelReservation, getAllUnpaidReservations } from "../ws_controllers/payment-controllers";
import { getSocket } from "./getWebSocket";
import { parse } from "cookie";
import verifyJWTForSocket from "../middlewares/verifyJWTForSocket";

const initializeWebSocket = (httpServer: Server) => {
    const io = getSocket(httpServer);
    io.on("connection", (ws) => {
        try{
            let cookies = ws.handshake.headers.cookie;
            if(!cookies){
                console.log("No cookies");
                ws.disconnect()
                return;
            }
            let parsedCookies = parse(cookies);
            let token = parsedCookies.token;
            let userId: number
            if(!token){
                console.log("No token");
                ws.disconnect()
                return;
            }
            const decoded = verifyJWTForSocket(token);
            if(decoded === "Unauthorized"){
                console.log("Unauthorized");
                ws.disconnect()
                return;
            }
            userId = decoded.id;
            const roomName = `user-${userId}`;
            ws.join(roomName);
            ws.on("get-reservations", async () => {
                const reservations = await getAllUnpaidReservations(userId);
                io.to(roomName).emit("reservations", reservations);
            });
            ws.on("cancel-reservation", async (orderId: string) => {
                await cancelReservation(orderId);
                const updatedReservations = await getAllUnpaidReservations(userId);
                io.to(roomName).emit("reservations", updatedReservations);
            });
        }catch(error){
            console.error("WebSocket error:", error);
            ws.disconnect();
        }
    });
}

export default initializeWebSocket;