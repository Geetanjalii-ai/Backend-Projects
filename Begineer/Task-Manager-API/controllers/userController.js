import {User} from "../models/users/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const createUser = async (req,res)=>{
    try
    {
       const {name,email,password}=req.body;
       if(!name || !email || !password)
       {
            return res.status(400).json({message:"All fields are required"});
       }
       
       const hashPassword=await bcrypt.hash(password,10);
       const user = new User({name,email,password:hashPassword});
       await user.save();
       res.status(201).json({message:"User created successfully",user});
    }

    catch(error)
    {
        res.status(500).json({message:"Error creating user",error});
    }
};

const getUser = async(req,res) =>{
      try
      {
          const {email,password}=req.body;
          const user=await User.findOne({email});
          if(!user)
          {
              return res.status(404).json({message:"User not found"});
          }

          const isPasswordValid=await bcrypt.compare(password,user.password);
          if(!isPasswordValid)
          {
              return res.status(401).json({message:"Invalid password"});
          }

          const token=jwt.sign({userId:user._id},process.env.JWT_KEY);
          res.status(200).json({message:"Login successful",token});
      }
      catch(error)
      {
          res.status(500).json({message:"Error logging in",error});
      }
};

export { createUser, getUser};

