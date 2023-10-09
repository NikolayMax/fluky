import {io} from "socket.io-client";

const options = {
    "force new connection": true,
    reconnectionAttempts: "Infinity",
    timeout: 1000,
    transports: ["websockets"]
}
const socket = io("http://localhost:9000/");

export default socket;