import mongoose from 'mongoose';

const taskSchema=new mongoose.Schema({
      title:{type:String,required:true},
      description:{type:String,required:true},
      status:{type:Boolean,default:false},
      owner:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true}
    });
console.log("Task model loaded");
export const Task=mongoose.model("Task",taskSchema);
