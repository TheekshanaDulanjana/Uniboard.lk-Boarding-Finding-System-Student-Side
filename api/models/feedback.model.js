import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
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
    feedback: {
      type: String,
      required: true,
    },

    username: {
      type: String,
      required: true,
    },

    avatar: {
      type: String,
      default:
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    },


    rating: { 
      type: Number,
      required: true,
      min: 1,
      max: 5, 
    },

    avgRating: {  
      type: Number,
      min: 1,
      max: 5, 
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
});

export default mongoose.model('Feedback', feedbackSchema);
