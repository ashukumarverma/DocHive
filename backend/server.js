// importing packages
import express from "express";
import http from "http";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js"; // importing the connectDB function from the db.js file
import authRoutes from "./routes/auth.js"; // Import the default export

const PORT = process.env.PORT || 5000; // setting the port number

dotenv.config(); // setting up the config file
connectDB(); // connecting to the database

const app = express(); // initializing the express app
const server = http.createServer(app); // creating a server

// cors is a middleware that allows the server to accept requests from the frontend (Cross Origin Resource Sharing)
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"], // allowed http methods
    allowedHeaders: ["Content-Type", "Authorization"], // allowed headers
  })
); // using the cors middleware

app.use(express.json()); // using the express.json middleware
app.use("/api/auth", authRoutes); // using the authRoutes middleware

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
