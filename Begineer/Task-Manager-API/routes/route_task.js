import express from 'express';
import auth from '../middlewares/auth.js';
import { createTask, getAlltasks, getTaskbyId, updateTask, deleteTask } from '../controllers/taskController.js';
const router2=express.Router();

router2.get('/',auth,(req,res)=>{
    res.send("task routes are working");
});

router2.post('/create',auth,createTask);
router2.get('/getAll',auth,getAlltasks);
router2.get('/get/:id',auth,getTaskbyId);
router2.put('/update/:id',auth,updateTask);
router2.delete('/delete/:id',auth,deleteTask);


export default router2;