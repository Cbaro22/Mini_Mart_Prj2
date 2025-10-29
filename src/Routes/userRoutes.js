
//import { body } from 'express-validator';
const router = express.Router();

//router.post('/register',
  //[ body('name').notEmpty(), body('email').isEmail(), body('password').isLength({ min: 6 }) ],
  //register);

//router.post('/login', [ body('email').isEmail(), body('password').notEmpty() ], login);

import express from 'express';
import { register, login, getAllUsers, getUser, updateUser, deleteUser } from '../controllers/userCtrls.js'
import { protect, admin } from '../Middlewares/authMiddleware.js'




router.post('/register', register);
router.post('/login', login);


router.get('/allUsers', protect, admin, getAllUsers);
router.get('/getUser/:id', protect, getUser);
router.put('/update/:id', protect, updateUser);
router.delete('/deleteuser/:id', protect, admin, deleteUser);



export default router;
