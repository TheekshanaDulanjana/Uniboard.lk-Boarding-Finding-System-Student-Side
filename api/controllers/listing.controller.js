import Listing from '../models/listing.model.js'; 
import { errorHandler } from '../utils/error.js'; 
import Feedback from '../models/feedback.model.js'; 

export const getListing = async (req, res, next) => {
    try {
        const listing = await Listing.findById(req.params.id); 
        if (!listing) {
            return next(errorHandler(404, 'Listing not found!')); 
        }

        const feedbacks = await Feedback.find({ listingId: listing._id });

    const avgRating = feedbacks.length > 0
      ? feedbacks.reduce((acc, feedback) => acc + feedback.rating, 0) / feedbacks.length
      : 0;


            res.status(200).json({ ...listing.toObject(), avgRating }); 
    } catch (error) {
        next(error); 
    }
};
export const getListings = async (req, res, next) => {
    try {
        const limit = parseInt(req.query.limit) || 9;
        const startIndex = parseInt(req.query.startIndex) || 0;
        const searchTerm = req.query.searchTerm || '';
        const sort = req.query.sort || 'updatedAt';
        // const order = req.query.order || 'desc';
        const order = req.query.order === 'asc' ? 1 : -1;
        const gender = req.query.gender || 'all';
        const room_type = req.query.room_type || 'all';
        

        console.log('Query Parameters:', { searchTerm, gender, room_type, sort  }); 

        let genderFilter = {};
        if (gender !== 'all') {
            genderFilter = { gender };
        }

        let room_typeFilter = {};
        if (room_type !== 'all') {
            room_typeFilter = { room_type };
        }

        let statusFilter = { status: { $ne: 'booked' } }; 
        

        const listings = await Listing.find({
            $or: [
            {titel: { $regex: searchTerm, $options: 'i' }},
            {description: { $regex: searchTerm, $options: 'i'} },
            {nearest_university: { $regex: searchTerm, $options: 'i'} },
            ],
            ...genderFilter,
            ...room_typeFilter,
            ...statusFilter,
        })
            .sort({ [sort]: order })
            .limit(limit)
            .skip(startIndex);

        console.log('Listings Found:', listings); 

        return res.status(200).json(listings);
    } catch (error) {
        next(error);
    }
};



export const getListingCount = async (req, res, next) => {
  try {
    const count = await Listing.countDocuments({ status: { $ne: 'booked' } })
    res.status(200).json({ success: true, count }); 
  } catch (error) {
    next(error);
  }
};


export const bookListing = async (req, res) => {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send('Listing ID is required');
    }
  
    try {

      const listing = await Listing.findById(id);
      if (!listing) {
        return res.status(404).json({ message: 'Listing not found' });
      }
  
      listing.isBooked = true; 
      await listing.save(); 

      res.status(200).json({ message: 'Listing successfully booked', listing });
    } catch (error) {

      res.status(500).json({ message: 'Error updating booking status', error: error.message });
    }
  };

  

