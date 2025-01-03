import { io } from "socket.io-client";
import { baseURL } from "./axiosInstance";

const socket = io(baseURL);

export default socket;
