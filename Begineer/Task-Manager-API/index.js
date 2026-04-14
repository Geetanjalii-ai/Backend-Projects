import express from 'express';
import { connectDB } from './config/db.js';
import router from './routes/route_user.js'
import dotenv from 'dotenv';

dotenv.config();

const app=express();

app.use(express.json());


app.use('/user',router);

app.get('/',(req,res)=>{

    res.send('<h1>Welcome, To Task Manager</h1>');
});

const startServer = async () => {
    try {
        await connectDB();

        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });

    } catch (err) {
        console.log('Failed to start server:', err);
    }
};

startServer();