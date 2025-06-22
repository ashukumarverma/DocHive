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
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

const app = express();
const server = http.createServer(app); // Create HTTP server using Express app

// Enable Cross-Origin Resource Sharing (CORS)
app.use(
  cors({
    origin: FRONTEND_URL, // Fixed: Remove the object wrapper
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  })
);

// Socket.io setup for real-time collaboration
const io = new Server(server, {
  cors: {
    origin: FRONTEND_URL, // Fixed: Remove the object wrapper
    methods: ["GET", "POST"],
  },
});

// Middleware to parse incoming JSON requests
app.use(express.json());

// Use routes for authentication and document handling
app.use("/api/auth", authRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/search", searchDocumentRoutes);

// Store active users in each document
const documentUsers = new Map();

io.on("connection", (socket) => {
  console.log("New Socket connection", socket.id);

  socket.on("joinDocument", (documentId) => {
    if (!documentId) return;
    
    socket.join(documentId);
    
    // Track users in this document
    if (!documentUsers.has(documentId)) {
      documentUsers.set(documentId, new Set());
    }
    documentUsers.get(documentId).add(socket.id);
    
    console.log(`User ${socket.id} joined document ${documentId}`);
    console.log(`Active users in document ${documentId}:`, documentUsers.get(documentId).size);
  });

  // Handle when user leaves a specific document
  socket.on("leaveDocument", (documentId) => {
    if (!documentId) return;
    
    socket.leave(documentId);
    
    // Remove user from tracking
    if (documentUsers.has(documentId)) {
      documentUsers.get(documentId).delete(socket.id);
      console.log(`User ${socket.id} left document ${documentId}`);
      
      // If no users left in document, clean up
      if (documentUsers.get(documentId).size === 0) {
        documentUsers.delete(documentId);
        console.log(`No users left in document ${documentId}, cleaned up`);
      }
    }
  });

  // Handle document updates from users
  socket.on("documentUpdate", ({ documentId, title, content }) => {
    if (!documentId) return;
    
    // Broadcast to other users in the same document
    socket.to(documentId).emit("receiveUpdate", { title, content });
    console.log(`User ${socket.id} updated document ${documentId}`);
  });

  // Handle document updates (alternative event name)
  socket.on("updateDocument", ({ documentId, title, content }) => {
    if (!documentId) return;
    
    // Broadcast to other users in the same document
    socket.to(documentId).emit("receiveUpdate", { title, content });
    console.log(`User ${socket.id} updated document ${documentId} (via updateDocument)`);
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log(`User ${socket.id} disconnected`);
    
    // Remove user from all documents they were in
    for (const [documentId, users] of documentUsers.entries()) {
      if (users.has(socket.id)) {
        users.delete(socket.id);
        console.log(`User ${socket.id} left document ${documentId}`);
        
        // If no users left in document, clean up
        if (users.size === 0) {
          documentUsers.delete(documentId);
          console.log(`No users left in document ${documentId}, cleaned up`);
        }
      }
    }
  });
});

server.listen(PORT, () => {
  console.log(
    `Server is running on port ${PORT} -> this log is from server.js`
  );
});
