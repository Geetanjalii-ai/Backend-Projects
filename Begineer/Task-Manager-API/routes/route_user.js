import express from 'express';
//import auth from '../middlewares/auth.js';
import { createUser, getUser} from '../controllers/userController.js';

const router=express.Router();

//router.use(auth);

router.post('/signUp',createUser);
router.post('/login',getUser);

export default router;