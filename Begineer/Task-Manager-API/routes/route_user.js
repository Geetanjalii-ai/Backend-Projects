import express from 'express';
//import auth from '../middlewares/auth.js';
import { createUser, getUser} from '../controllers/userController.js';

const router1=express.Router();

//router.use(auth);

router1.post('/signUp',createUser);
router1.post('/login',getUser);

export default router1;