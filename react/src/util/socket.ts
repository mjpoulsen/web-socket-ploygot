import { io } from "socket.io-client";

export const socketIoClient = io("localhost:8000", {
  transports: ["websocket"],
});

export const websocket = new WebSocket("ws://localhost:8000");
