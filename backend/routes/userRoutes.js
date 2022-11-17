import express from 'express';
import {
  authUser,
  createUser,
  getUserProfile,
  getUsers,
  updateUserProfile,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET
router.route('/').get(getUsers);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

// POST
router.route('/login').post(authUser);
router.route('/').post(createUser);

export default router;
