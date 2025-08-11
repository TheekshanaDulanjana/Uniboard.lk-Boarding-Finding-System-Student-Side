import express from 'express'; 
import mongoose from 'mongoose'; 
import dotenv from 'dotenv'; 
import cors from 'cors'; 
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import listingRouter from './routes/listing.route.js'; 
import feedbackRouter from './routes/feedback.routes.js'; 
import bookingRoutes from './routes/booking.route.js';
import mailRoutes from './routes/mail.route.js'; 
import cookieParser from 'cookie-parser';

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('Connected to MongoDB!'); 
  })
  .catch((err) => {
    console.log(err); 
  });

const app = express(); 

app.use(cors({
  origin: 'http://localhost:5173', 
}));

app.use(express.json()); 
app.use(cookieParser()); 

app.use("/api/user", userRouter); 
app.use("/api/auth", authRouter); 
app.use('/api/listing', listingRouter);
app.use('/api/feedback', feedbackRouter);
app.use('/api/booking', bookingRoutes);
app.use('/api/mail', mailRoutes); 

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500; 
  const message = err.message || 'Internal Server error'; 
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); 
});
