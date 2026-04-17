import express from 'express';
import { getWeatherData } from '../middlewares/getWeatherData.js';
import { createTask, getAllTasks, getTaskbyId, updateTask, deleteTask } from '../controllers/taskController.js';
import {auth} from '../middlewares/auth.js';

const taskRouter=express.Router();

taskRouter.use(auth);

taskRouter.post('/create',getWeatherData,createTask);
taskRouter.get('/getAll',getAllTasks);
taskRouter.get('/get/:id',getTaskbyId);
taskRouter.put('/update/:id',getWeatherData,updateTask);
taskRouter.delete('/delete/:id',deleteTask);

export default taskRouter;
