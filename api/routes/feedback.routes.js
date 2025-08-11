
import express from 'express';
import { addFeedback, getFeedbackByListingId } from '../controllers/feedback.controller.js';
import { isAuthenticated } from '../middleware/authMiddleware.js'; 

const router = express.Router();

router.post('/', isAuthenticated, addFeedback); 
router.get('/:listingId', getFeedbackByListingId); 

export default router;
