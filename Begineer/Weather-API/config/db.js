import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


const connectDB=async()=>{

    try{
       console.log('Connecting to DB...');
       await mongoose.connect(process.env.MONGODB_URL);
       console.log('Connected to DB successfully');
       }
       catch(error)
       {
        console.error('Error connecting to DB:',error.message);
       }
};

export default connectDB;
