import Booking from '../models/booking.model.js';
import Listing from '../models/listing.model.js';

export const createBooking = async (req, res) => {
    const { listingId, userId, bookingTime, amount,status ,start,end} = req.body;

    try {
        const newBooking = new Booking({
            listingId,
            userId,
            bookingTime,
            amount,
            status,
            start,
            end 
        });

        await newBooking.save();
        await Listing.findByIdAndUpdate(listingId, { status });
        res.status(201).json(newBooking);
    } catch (error) {
        console.error('Error creating booking:', error); 
        res.status(500).json({ message: 'Failed to create booking' });
    }
    
};


export const getUserBookings = async (req, res) => {
    try {
      const bookings = await Booking.find({ userId: req.params.userId }).populate('listingId');
      res.status(200).json(bookings);
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
