import mongoose from 'mongoose'; 

const studentUserSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: false,
    },
    gender: {
      type: String,
      enum: ['Male', 'Female'], 
      required: false,
    },
    SMobile: {
      type: String,
      required: false,
    },
    dob: {
      type: String,
      required: false,
    },
    street: {
      type: String,
      required: false,
    },
    district: {
      type: String,
      required: false,
    },
    province: {
      type: String,
      required: false,
    },
    university: {
      type: String,
      required: false,
    },
    nic: {
      type: String,
      required: false,
      unique: true,
    },
    PName: {
      type: String,
      required: false,
    },
    PMobile: {
      type: String,
      required: false,
    },
    username: {
      type: String,
      required: false,
      unique: true,
    },
    email: {
      type: String,
      required: false,
      unique: true,
    },
    password: {
      type: String,
      required: false,
    },
    avatar: {
      type: String,
      default:
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    },
  },
  { timestamps: true } 
);

const Student = mongoose.model('Student', studentUserSchema);

export default Student;
