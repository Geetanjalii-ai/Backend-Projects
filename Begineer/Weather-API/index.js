import express from 'express';
import connectDB from './config/db.js';
import UserRouter from './routes/userRoutes.js';
import TaskRouter from './routes/taskRoutes.js';


const app=express();

app.use(express.json());

app.get('/',(req,res)=>{
    res.send('Welcome to Weather API');
})

app.use('/user',UserRouter);
app.use('/tasks',TaskRouter);

const startServer=async()=>{

   try{
      await connectDB();
      app.listen(3000,()=>{
          console.log('Server is running on port 3000');
      });
   }
   catch(error)
   {
    console.error('Error starting server:',error.message);
   }
};

startServer();