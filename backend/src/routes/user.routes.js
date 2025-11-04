import express from 'express';
import { showAllUsers } from '../controllers/user.controllers.js';
import { protectAdminRoute } from '../middleware/auth.middleware.js';

const router = express.Router()

router.get('/getuser/all',protectAdminRoute,showAllUsers);

export default router;