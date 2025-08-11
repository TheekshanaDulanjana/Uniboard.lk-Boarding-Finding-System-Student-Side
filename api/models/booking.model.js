import mongoose from 'mongoose';
const bookingSchema  = new mongoose.Schema({
    listingId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Listing',
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Student', 
    },
    amount: {
      type: Number,
      required: true,
    },
    start: {
      type: Date,
      required: true,
    },
    end : {
      type: Date,
      required: true,
    },
    bookingTime: { 
      type: Date, 
      default: Date.now },
      
    status: { 
      type: String, 
      default: 'booked' }
});

export default mongoose.model('Booking', bookingSchema );
