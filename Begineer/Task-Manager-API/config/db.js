import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDB = async () =>{
    try
    {
        console.log("Connecting to MongoDB...");
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected to MongoDB successfully")
        
    }
    catch(err)
    {
        console.log("Error in connectDB function:", err);
    }
};