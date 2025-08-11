import mongoose from "mongoose";

const listingSchema = new mongoose.Schema({

  listingId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Listing', 
  },
    
    address: { 
        type: String,
        required: true,
      },
    
      titel: {
        type: String,
        required: true,
      },

      description: {
        type: String,
        required: true,
      },
      
      contact_no: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      gender: { 
        type: String, 
        enum: ['male', 'female'], 
        required: true
      },

      image_name: {
        type: String,
        required: true,
      },
      key_money: {
        type: String,
        required: true,
      },
      location: {
        type: {
          longitude: {
            type: Number,
            required: true,
          },
          latitude: {
            type: Number,
            required: true,  
          },
        },
        required: true,
      },
    
      location_discription: {
        type: String,
        required: true,
      },
      

      status: { 
        type: String, 
        default: 'booked' },
    
      no_of_rooms: {
        type: String,
        required: true,
      },

    
      no_of_stay_student: {
        type: String,
        required: true,
      },
    
      owner_name: {
        type: String,
        required: true,
      },
    
      ownser_staying: {
        type: String,
        required: true,
      },

      avgRating: {  
        type: Number,
        min: 1,
        max: 5, 
      },
    
      room_type: {
        type: String, 
        enum: [ 'single', 'double' , 'triple' ], 
        required: true 
      },
    
      safty: {
        type: String,
        required: true,
      },
    
      social: {
        type: String,
        required: true,
      },
    
      monthly_rental_fee: {
        type: String,
        required: true,
      },
    
      nearest_university: {
        type: String,
        required: true,
      },
    
      distance: {
        type: String,
        required: true,
      },
    
      transportation: {
        type: String,
        required: true,
      },
    
      pickup_space: {
        type: String,
        required: true,
      },
    
      facilities: {
        type: String,
        required: true,
      },
    
      con: {
        type: String,
        required: true,
      },
      
      proximity_to_facilities: {
        type: String,
        required: true,
      },

      isBooked: {
        type: Boolean,
        default: false
      },

      updatedAt: {
        type: Date,
        default: Date.now,
      },


   
}, { timestamps: true });

const Listing = mongoose.model('Listing', listingSchema);

export default Listing;
