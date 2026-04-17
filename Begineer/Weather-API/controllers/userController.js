import bcrypt from 'bcrypt';
import {User} from '../models/user.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


const signUp=async(req,res)=>{

     try{
         const {name,email,password}=req.body;
         const hashPassword=await bcrypt.hash(password,10);

         const user = new User({
           name,
           email,
           password:hashPassword
         });

         await user.save();
         res.status(201).json({message:'User registered successfully',user});
     }
     catch(error)
     {
        res.status(500).json({message:'Error registering user',error:error.message});
     }

};

const signIn=async(req,res)=>{

    try{
        const {email,password}=req.body;
        const user=await User.findOne({email});
        if(!user)
        {
            return res.status(401).json({message:'Invalid credentials'});
        }

        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch)
        {
            return res.status(401).json({message:'Invalid credentials'});
        
        }
        const token=jwt.sign({userId:user._id},process.env.JWT_SECRET_KEY);
        res.status(200).json({message:'User logged in successfully',token});
    }
    catch(error)
    {
        res.status(500).json({message:'Error logging in user',error:error.message});
    
    }
};

export {signUp,signIn};