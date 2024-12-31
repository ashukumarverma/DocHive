import express from "express";
import http from "http";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import documentRoutes from "./routes/document.routes.js";
import searchDocumentRoutes from "./routes/search.routes.js";
import { Server } from "socket.io";

dotenv.config();
connectDB();

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app); // Create HTTP server using Express app

// Enable Cross-Origin Resource Sharing (CORS)
app.use(
  cors({
    origin: "http://localhost:5173", // Allow only this origin (Frontend URL)
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  })
);

// Socket.io setup for real-time collaboration
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173', 
        methods: ['GET', 'POST']
    }
})

// Middleware to parse incoming JSON requests
app.use(express.json());

// Use routes for authentication and document handling
app.use("/api/auth", authRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/search", searchDocumentRoutes);

io.on("connection", (socket) => {
  console.log("New WebSocket connection");

  //user on documentdetails - useuseffect
  socket.on("joinDocument", (documentId) => {
    socket.join(documentId);
    console.log(`User joined document ${documentId}`);
  });
  // user when changes the input feild values
  socket.on("documentUpdate", ({ documentId, title, content }) => {
    socket.to(documentId).emit("receiveUpdate", { title, content });
  });

  //this is not used by the frontend
  socket.on("sendMessage", ({ documentId, message }) => {
    socket.to(documentId).emit("receiveMessage", message);
  });
});

server.listen(PORT, () => {
  console.log(
    `Server is running on port ${PORT} -> this log is from server.js`
  );
});
