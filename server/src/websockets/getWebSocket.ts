import { Server as ServerIO } from "socket.io";
import { Server as ServerHttp } from "http";

let socket: ServerIO;

const getSocket = (httpServer: ServerHttp) => {
    if (!socket) {
        socket = new ServerIO(httpServer, {
            cors: {
                origin: "http://localhost:3000",
                methods: ["GET", "POST"],
                credentials: true
            }
        });
    }
    return socket;
}

export {
    getSocket
}