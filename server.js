import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoute from './Routes/authRoute.js';

// Load environment variables from .env file
dotenv.config();

// Environment variables
const { MONGO_URL, PORT } = process.env;

const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(cors()); // Enable CORS

app.use("/", authRoute);

// Function to set up connection with MongoDB server
const connection = async () => {
    try {
        await mongoose.connect(MONGO_URL);
        console.log("MongoDB Connected");
    } catch (err) {
        console.error("Connection error:", err.message);
    }
};

// Start the server
const startServer = async () => {
    await connection(); // MongoDB connection
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
};

// Start the application
startServer();
