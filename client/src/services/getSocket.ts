import { io } from 'socket.io-client';

let socket: any;

const getSocket = () => {
    if (!socket) {
        socket = io("http://localhost:5000", {
            withCredentials: true
        });
    }
    return socket;
}

const closeSocket = () => {
    if (socket) {
        socket.close();
        socket = null;
    }
}

export {
    getSocket,
    closeSocket
}