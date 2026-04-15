import express from 'express';
import { connectDB } from './config/db.js';
import router1 from './routes/route_user.js';
import router2 from './routes/route_task.js';
import dotenv from 'dotenv';

dotenv.config();

const app=express();

app.use(express.json());


app.use('/user',router1);
app.use('/tasks',router2);

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