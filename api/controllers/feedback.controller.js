import Feedback from '../models/feedback.model.js';
import Listing from '../models/listing.model.js';

export const addFeedback = async (req, res) => {
  try {
      const { listingId, feedback, rating } = req.body;
      const userId = req.user.id;

      if (!userId || !rating || rating < 1 || rating > 5) {
          return res.status(400).json({ success: false, message: 'Invalid input' });
      }

      const newFeedback = new Feedback({
          listingId,
          userId,
          username: req.body.username,
          avatar: req.body.avatar,
          feedback,
          rating,
      });

      await newFeedback.save();

      const feedbacks = await Feedback.find({ listingId });
      const totalRating = feedbacks.reduce((acc, feedback) => acc + feedback.rating, 0);
      const avgRating = totalRating / feedbacks.length;

      await Feedback.updateMany({ listingId }, { avgRating });
      await Listing.findByIdAndUpdate(listingId, { avgRating });

      return res.status(201).json({
          success: true,
          message: 'Feedback and rating added successfully',
          feedback: newFeedback,
      });
  } catch (error) {
      return res.status(500).json({ success: false, message: 'Failed to add feedback', error: error.message });
  }
};


export const getFeedbackByListingId = async (req, res) => {
  try {
      const { listingId } = req.params;
      const feedbacks = await Feedback.find({ listingId });

      if (!feedbacks.length) {
          return res.status(404).json({ success: false, message: 'No feedback found' });
      }

      return res.status(200).json({
          success: true,
          feedbacks: feedbacks.map(feedback => ({
              ...feedback.toObject(),
              avgRating: feedback.avgRating 
          })),
      });
  } catch (error) {
      return res.status(500).json({ success: false, message: 'Failed to retrieve feedback', error: error.message });
  }
};
