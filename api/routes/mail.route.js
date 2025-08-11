import express from 'express';
import { RequestEmails, sendEmails } from '../controllers/mail.controller.js';

const router = express.Router();

router.post('/sendEmails', sendEmails); 
router.post('/RequestEmails', RequestEmails)


export default router;
