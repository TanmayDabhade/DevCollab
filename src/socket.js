import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
  transports: ["websocket"], // or ["websocket", "polling"] if you want fallback
});

export default socket;
