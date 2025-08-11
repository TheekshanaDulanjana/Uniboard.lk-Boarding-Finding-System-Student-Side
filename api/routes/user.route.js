import express from 'express'; 

import { getUser } from '../controllers/user.controller.js';
import { deleteUser, updateUser, } from '../controllers/user.controller.js';
import { getUserCount } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);
router.get('/count', getUserCount);
router.get('/:id', verifyToken, getUser)

export default router;
