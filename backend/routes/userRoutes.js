import express from 'express'
import { authUser, createUser, getUserProfile, getUsers } from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET
router.route('/').get( getUsers);
router.route('/profile').get(protect, getUserProfile);

// POST
router.route('/login').post(authUser);
router.route('/').post(createUser)

export default router