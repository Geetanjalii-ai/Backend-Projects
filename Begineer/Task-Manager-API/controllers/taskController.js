import {Task} from "../models/tasks/task.js";

const createTask=async(req,res)=>{

    try{
        const  {title,description,status}=req.body;

        const task=new Task({title,description,status,owner:req.user._id});
        await task.save();
        res.status(201).json({message:"Task created successfully",task});
    }
    catch(error)
    {
        res.status(500).json({message:"Error creating Task",error});
    }

};

const getAlltasks=async(req,res)=>{

  try{
      const tasks=await Task.find({owner:req.user._id});
      res.status(200).json({message:"Tasks fetched successfully",tasks});
  }
  catch(error)
  {
     res.status(500).json({message:"Error fetching Tasks",error});
  }
};

const getTaskbyId=async(req,res)=>{
  const taskId=req.params.id;
  try{
      const task=await Task.findOne({owner:req.user._id,_id:taskId});
      if(!task)
      {
          return res.status(404).json({message:"Task not found"});
      }
      res.status(200).json({message:"Task fetched successfully",task});
  }
  catch(error)
  {
      res.status(500).json({message:"Error fetching Task",error});
  }
};

const updateTask=async(req,res)=>{
    const taskId=req.params.id;
    const {title,description,status}=req.body;
    try{
        const task=await Task.findOneAndUpdate({owner:req.user._id,_id:taskId},{title,description,status},{new:true});
        if(!task)
        {
          return res.status(404).json({message:"Task not found"});
        }
        res.status(200).json({message:"Task updated successfully",task});
    }
    catch(error)
    {
        res.status(500).json({message:"Error updating Task",error});
    }
};

const deleteTask=async(req,res)=>{

    const taskId=req.params.id;
    try{
        const task=await Task.findOneAndDelete({owner:req.user._id,_id:taskId});
        if(!task)
        {
          return res.status(404).json({message:"Task not found"});
        }

        res.status(200).json({message:"Task deleted successfully"});
    }
    catch(error)
    {
        res.status(500).json({message:"Error deleting Task",error});
    }

};

export {createTask,getAlltasks,getTaskbyId,updateTask,deleteTask};