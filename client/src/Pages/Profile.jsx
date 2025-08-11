import { useEffect, useRef, useState } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { useDispatch, useSelector } from 'react-redux';
import { app } from '../firebase';
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  logoutUserStart,
} from '../redux/user/userSlice';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import ListingItem from '../components/ListingItem';


const genders = [
  'Male',
  'Female',
];

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading} = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [error, setError] = useState(null);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false); 
  const [showDeletePopup, setShowDeletePopup] = useState(false);  
  const [showPassword, setShowPassword] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [showUploadPopup, setShowUploadPopup] = useState(false);
  const dispatch = useDispatch();

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);


  useEffect(() => {
    const fetchUserBookings = async () => {
      try {
        const res = await fetch(`/api/booking/user/${currentUser._id}`);
        const data = await res.json();
        setBookings(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchUserBookings();
  }, [currentUser]);
  

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = `${new Date().getTime()}_${file.name}`;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    setShowUploadPopup(true);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
        });
        setTimeout(() => {
          setShowUploadPopup(false); 
        }, 2000);
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const password = formData.password;

  const minLength = 8;
  const maxLength = 12;
  const uppercaseRegex = /[A-Z]/;
  const lowercaseRegex = /[a-z]/;
  const numberRegex = /[0-9]/;
  const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

  if (password.length < minLength || password.length > maxLength) {
    setError('Password must be between 8 and 16 characters.');
    return;
  }
  if (!uppercaseRegex.test(password)) {
    setError('Password must include at least one uppercase letter.');
    return;
  }
  if (!lowercaseRegex.test(password)) {
    setError('Password must include at least one lowercase letter.');
    return;
  }
  if (!numberRegex.test(password)) {
    setError('Password must include at least one number.');
    return;
  }
  if (!specialCharRegex.test(password)) {
    setError('Password must include at least one special character.');
    return;
  }
  if (formData.SMobile && formData.SMobile.length !== 10) {
    alert('Mobile number must be exactly 10 digits.');
    return;
  }
  if (formData.PMobile && formData.PMobile.length !== 10) {
    alert('Mobile number must be exactly 10 digits.');
    return;
  }

    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),  
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);  
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };
  

  const handleLogout = async () => {
    try {
      dispatch(logoutUserStart());
      const res = await fetch('/api/auth/logout');
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  return (
<div className='p-4 max-w-6xl mx-auto'>
<h1 className="text-3xl font-bold mb-2 text-center my-24 uppercase font-poppins">Profile</h1>
<hr className="border-t-2 border-gray-300 mt-2 mb-10 w-96 mx-auto" />
     
  <form onSubmit={handleSubmit} className='flex flex-col gap-6 bg-white rounded-lg p-8 shadow-md'>

    <div className='flex justify-between items-center'>
      <div className='flex items-center gap-4'>
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept='image/*'
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          alt="profile"
          className='rounded-lg w-40 h-40 object-cover cursor-pointer'
        />

        <div>
          <h2 className='text-2xl font-bold'>{currentUser.fullname || 'Full Name'}</h2>
          <p className='text-gray-500 text-lg'>{currentUser.university || 'User University'}</p>
        </div>
      </div>


          {/* Upload Progress Popup */}
          {showUploadPopup && (
            <div className='fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center'>
              <div className='bg-white p-5 w-60 rounded-md shadow-lg text-center text-customGreen font-semibold'>
                <p>{fileUploadError ? 'Error uploading image.' : `Uploading: ${filePerc}%`}</p>
                <p>{filePerc === 100 ? 'Upload complete!' : ''}</p>
              </div>
            </div>
          )}
        

      
      <div className='text-right -mt-12'>
      <h2 className='text-lg font-semibold font-poppins text-black'>Personal Information</h2>
      <div className='flex flex-col items-end'>
        <span
      onClick={() => setShowDeletePopup(true)}
      className='text-red-600 text-sm font-semibold cursor-pointer mt-2'
    >
      DELETE ACCOUNT
    </span>
        
    <span
      onClick={() => setShowLogoutPopup(true)}
      className='text-green-600 text-sm font-semibold cursor-pointer'
    >
      LOG OUT
    </span>
  </div>
</div>

    </div>

    {/* Personal Information Fields */}
    <div className='grid grid-cols-3 gap-4 mt-4'>
    <Autocomplete
      disablePortal
      id="gender"
      options={genders}
      defaultValue={currentUser.gender}
      onChange={(event, value) => setFormData({ ...formData, gender: value })}  // Gender set කරනවා
      renderInput={(params) => <TextField {...params} 
      label="Gender"
      sx={{
        '& .MuiOutlinedInput-root': {
          '&.Mui-focused fieldset': {
            borderColor: '#16423C',
          },
          color: '#16423C',
        },
        '& .MuiInputLabel-root': {
          color: '#707070',
        },
        '& .MuiInputLabel-root.Mui-focused': {
          color: '#16423C', 
        },
      }} 
      className='border p-2 rounded-lg' />}
    />

<Box >
        <TextField
          id="SMobile"
          label="Your Mobile Number"
          variant="outlined"
          type="string"
          defaultValue={currentUser.SMobile}
          fullWidth
          onChange={handleChange}
          sx={{
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused fieldset': {
                borderColor: '#16423C',
              },
              color: '#16423C',
            },
            '& .MuiInputLabel-root': {
              color: '#707070',
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#16423C', 
            },
          }}
          inputProps={{
            maxLength: 10,
          }}
          onInput={(e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, ''); 
            if (e.target.value.length > 10) {
              e.target.value = e.target.value.slice(0, 10);
            }
          }}
        />
      </Box>


    <Box >
        <TextField
          id="dob"
          label="Date of Birth"
          variant="outlined"
          type="date"
          defaultValue={currentUser.dob}
          onChange={handleChange}
          sx={{
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused fieldset': {
                borderColor: '#16423C',
              },
              color: '#16423C',
            },
            '& .MuiInputLabel-root': {
              color: '#707070',
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#16423C', 
            },
          }}
          fullWidth
        />
      </Box>

      {/* Parents Name */}
      <Box >
        <TextField
          id="PName"
          label="Parents Name"
          variant="outlined"
          type="text"
          defaultValue={currentUser.PName}
          onChange={handleChange}
          sx={{
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused fieldset': {
                borderColor: '#16423C',
              },
              color: '#16423C',
            },
            '& .MuiInputLabel-root': {
              color: '#707070',
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#16423C', 
            },
          }}
          fullWidth
        />
      </Box>

      {/* Parents Mobile Number */}
      <Box >
        <TextField
          id="PMobile"
          label="Parents Mobile Number"
          variant="outlined"
          type="string"
          defaultValue={currentUser.PMobile}
          fullWidth
          onChange={handleChange}
          sx={{
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused fieldset': {
                borderColor: '#16423C',
              },
              color: '#16423C',
            },
            '& .MuiInputLabel-root': {
              color: '#707070',
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#16423C', 
            },
          }}
          inputProps={{
            maxLength: 10,
          }}
          onInput={(e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, ''); 
            if (e.target.value.length > 10) {
              e.target.value = e.target.value.slice(0, 10);
            }
          }}
        />
      </Box>

      {/* NIC */}
      <Box >
      <TextField
          id="nic"
          label="NIC"
          variant="outlined"
          defaultValue={currentUser.nic}
          fullWidth
          onChange={handleChange}
          sx={{
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused fieldset': {
                borderColor: '#16423C',
              },
              color: '#16423C',
            },
            '& .MuiInputLabel-root': {
              color: '#707070',
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#16423C', 
            },
          }}
          inputProps={{
            maxLength: 12,
            onInput: (e) => {
              let value = e.target.value.toUpperCase(); 
                value = value.replace(/[^0-9VW]/g, ""); 
              const match = value.match(/^(\d{0,9})([VW]?)(\d*)$/);
              if (match) {
                const [_, firstPart, letterPart, extraDigits] = match;

                if (letterPart) {e.target.value = firstPart + letterPart;
                } else {
                  e.target.value = firstPart + extraDigits.slice(0, 3);
                }
              } else {
                e.target.value = value.slice(0, -1);
              }
            },
          }}
        />
      </Box>
    
    
    </div>

    {/* Authentication Section */}
    <div className='mt-8'>
      <h2 className='text-lg font-semibold font-poppins text-black mb-6 justify-self-end'>Authentication</h2>
        <div className='grid grid-cols-3 gap-4'>
      <Box>
        <TextField
          id="username"
          label="Username"
          variant="outlined"
          type="text"
          defaultValue={currentUser.username}
          onChange={handleChange}
          sx={{
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused fieldset': {
                borderColor: '#16423C',
              },
              color: '#16423C',
            },
            '& .MuiInputLabel-root': {
              color: '#707070',
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#16423C', 
            },
          }}
          fullWidth
        />
      </Box>

      {/* Email */}
      <Box>
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          type="email"
          defaultValue={currentUser.email}
          onChange={handleChange}
          sx={{
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused fieldset': {
                borderColor: '#16423C',
              },
              color: '#16423C',
            },
            '& .MuiInputLabel-root': {
              color: '#707070',
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#16423C', 
            },
          }}
          fullWidth
        />
      </Box>

      <Box>
  <TextField
    id="password"
    label="Password"
    
    variant="outlined"
    defaultValue={currentUser.password}
    type={showPassword ? 'text' : 'password'}
    placeholder="Password"
    fullWidth
    sx={{
      '& .MuiOutlinedInput-root': {
        '&.Mui-focused fieldset': {
          borderColor: '#16423C',
        },
        color: '#16423C',
      },
      '& .MuiInputLabel-root': {
        color: '#707070',
      },
      '& .MuiInputLabel-root.Mui-focused': {
        color: '#16423C', 
      },
    }}

  />
  <div className='flex items-center mt-2'>
    <input
      type='checkbox'
      id='showPassword'
      className="mr-2 accent-customGreen"
      onChange={() => setShowPassword(!showPassword)}
    />
    <label htmlFor='showPassword'>Show Password</label>
  </div>
</Box>




  </div>
    </div>

    {/* Update Button */}
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
  <button
      disabled={loading}
      className='bg-customGreen  text-white font-semibold rounded-lg p-2 -mt-2 w-40 uppercase hover:opacity-95 disabled:opacity-80'
    >
      {loading ? 'Loading...' : 'Update'}
    </button>
    </div>
     {/* Error or Success Message */}
 
  </form>
  <p className='text-center text-red-500 mt-5'>{error ? error : ''}</p>
  <p className='text-center text-green-700 mt-5'>{updateSuccess ? 'User updated successfully!' : ''}</p>


  {showLogoutPopup && (
        <div className='fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center'>
          <div className='bg-white p-5 rounded-lg shadow-lg text-center'>
            <p>Are you sure you want to logout?</p>
            <div className='mt-3 flex justify-center gap-5'>
              <button onClick={handleLogout} className='bg-customGreen text-white py-2 px-4 rounded-md w-44 hover:bg-green-900'>Yes</button>
              <button onClick={() => setShowLogoutPopup(false)} className='bg-white text-customGreen font-semibold py-2 px-4 rounded-md w-44 border-2 border-customGreen'>No</button>
            </div>
          </div>
        </div>
      )}


      {showDeletePopup && (
        <div className='fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center'>
          <div className='bg-white p-5 rounded-lg shadow-lg text-center'>
            <p>Are you sure you want to delete your account?</p>
            <div className='mt-3 flex justify-center gap-5'>
              <button onClick={handleDeleteUser} className='bg-customGreen text-white py-2 px-4 rounded-md w-44 hover:bg-green-900'>Delete Account</button>
              <button onClick={() => setShowDeletePopup(false)} className='bg-white text-customGreen font-semibold py-2 px-4 rounded-md w-44 border-2 border-customGreen'>Cancel</button>
            </div>   
          </div>
        </div>
      )}



<form className='flex flex-col bg-white rounded-lg shadow-md'>
  <h1 className='text-xl font-poppins font-semibold text-center my-9 uppercase'>
    You Booked Boarding
  </h1>
  <div className='flex flex-wrap gap-4 mb-10 justify-start ml-10'>
    {bookings.length > 0 ? (
      bookings.map((booking) => (
        <div key={booking._id} className='flex-shrink-0'>
          <ListingItem listing={booking.listingId} />
        </div>
      ))
    ) : (
      
      <div className="flex justify-center items-center w-full">
        <p className="mb-5 -mt-5 mr-8 text-gray-500 text-center italic">Not yet booked</p>
      </div>
)}
  </div>
</form>
 {error && <p className='text-red-500 text-center mt-48'>{error}</p>}
    
 </div>
  );
}
