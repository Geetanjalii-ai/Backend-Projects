import {Task} from "../models/tasks.js";


const createTask = async(req,res)=>{

  try{
     const{title,city}=req.body;
     const {temperature,humidity}=req.weather;
     const task=new Task({
      title,
      city,
      temperature,
      humidity,
      userId:req.user._id
     });

     await task.save();
     res.status(201).json({message:'Task created successfully',task});
  }
  catch(error)
  {
     res.status(500).json({message:'Error creating task',error:error.message});
  
  }
};

const getAllTasks=async(req,res)=>{

    try{
       const tasks=await Task.find({userId:req.user._id});
       res.status(200).json({tasks});
    }
    catch(error)
    {
      res.status(500).json({message:'Error getting tasks',error:error.message});
    }
};


const getTaskbyId=async(req,res)=>{
   
    const taskId=req.params.id;
    try{
       const task=await Task.findOne({userId:req.user._id,_id:taskId});
       if(!task)
       {
          return res.status(404).json({message:'Task not found'});
       }

       res.status(200).json({task});
       
    }
    catch(error)
    {
       res.status(500).json({message:'Error getting task',error:error.message});
    }
};

const updateTask=async(req,res)=>{
   const taskId=req.params.id;

   try{

      let updateData={};
      if(req.body.city)
      {
          updateData.city=req.body.city;
          updateData.temperature=req.weather.temperature;
          updateData.humidity=req.weather.humidity;
      }
      const task=await Task.findOneAndUpdate({userId:req.user._id,_id:taskId},updateData,{new:true});
      if(!task)
      {
         return res.status(404).json({message:'Task not found'});
      
      }
      res.status(200).json({message:'Task updated successfully',task});
   }
   catch(error)
   {
      res.status(500).json({message:'Error updating task',error:error.message});
   }

};

const deleteTask=async(req,res)=>{

   const taskId=req.params.id;
   try{
      const task=await Task.findOneAndDelete({userId:req.user._id,_id:taskId});
      if(!task)
      {
         return res.status(404).json({message:'Task not found'});
      
      }
      res.status(200).json({message:'Task deleted successfully'});
   }
   catch(error)
   {
      res.status(500).json({message:'Error deleting task',error:error.message});
   }
      
};

export {createTask,getAllTasks,getTaskbyId,updateTask,deleteTask};