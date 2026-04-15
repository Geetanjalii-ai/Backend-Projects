import jwt from 'jsonwebtoken';
import {User} from "../models/users/user.js";


const auth = async(req,res,next) =>{
    try{
      const token = req.header('Authorization');//to get the token from the header
  const decodedToken=jwt.verify(token,process.env.JWT_KEY); //to verify the token and get the decoded token
  const user= await User.findOne({_id:decodedToken.userId})
  if(!user) //to check if the token is valid
  {
      return res.status(401).json({message:"Unauthorized User"});
  }
  req.user=user; //to set the user in the request object
  req.decodedToken=decodedToken; //to set the decoded token in the request object
  next();
}
catch(error)
{
    res.status(401).json({message:"Unauthorized",error});
}  
};

export default auth;