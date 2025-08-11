// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   loginFailure,
//   loginStart,
//   loginSuccess,
// } from '../redux/user/userSlice';
// import OAuth from '../components/OAuth';
// import PDFLogo from '../assets/PDFLogo.png';
// import loginImage from '../assets/loginImage.jpg';

// export default function Login() {
//   const [formData, setFormData] = useState({});
//   const [showPassword, setShowPassword] = useState(false);
//   const [showPopup, setShowPopup] = useState(false); 
//   const { loading, error } = useSelector((state) => state.user);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.id]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       dispatch(loginStart());
//       const res = await fetch('/api/auth/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });
//       const data = await res.json();
//       localStorage.setItem('user', JSON.stringify(data.user));
//       localStorage.setItem('token', JSON.stringify(data.token));
      
//       if (data.success === false) {
//         dispatch(loginFailure(data.message));
//         setShowPopup(true);
//         return;
//       }
//       dispatch(loginSuccess(data.rest));
//       navigate('/');
//     } catch (error) {
//       dispatch(loginFailure(error.message));
//     }
//   };
//   const closePopup = () => setShowPopup(false);

//   return (
//     <div className='flex h-screen'>

//       <div className='w-full md:w-1/2 p-10 flex flex-col justify-center'>
//        <div className="flex items-center justify-center h-full mt-3">
//           <img src={PDFLogo} alt="UniBoard.lk" className="h-52" />
//         </div>


//         <div className="ml-[20px]">
//         <div className="mt-[-60px]">
//             <h2 className="text-xl font-bold  text-left">Welcome to UniBoard.lk</h2>
//             <p className="text-gray-500 mb-8 text-sm text-left">
//             Discover affordable and convenient boarding near your campus! Log in to find options based on your university and location, or list your property to connect with students looking for housing. Your perfect place is just a few clicks away!</p>
//         </div>


//             <p className='text-sm font-semibold text-left mb-0.5'>Email</p>
            
//             <form onSubmit={handleSubmit} className='w-full max-w-md space-y-4'>
//               <input
//                 type='email'
//                 placeholder='Email'
//                 className='border p-3 w-full rounded-lg'
//                 id='email'
//                 onChange={handleChange}
//               />

//               <p className='text-sm font-semibold text-left mb-0.5'>Password</p>
//               <input
//                 type={showPassword ? 'text' : 'password'}
//                 placeholder='Password'
//                 className='border p-3 w-full rounded-lg'
//                 id='password'
//                 onChange={handleChange}
//               />

//               <div className='flex items-center'>
//                 <input
//                   type='checkbox'
//                   id='showPassword'
//                   className='mr-2'
//                   onChange={() => setShowPassword(!showPassword)}
//                 />
                
//                 <label htmlFor='showPassword'>Show Password</label>
//               </div>

//               <button
//                 disabled={loading}
//                 className='bg-[#16423C] font-semibold text-white p-3 w-full rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
//               >
//                 {loading ? 'Loading...' : 'Log In'}
//               </button>

//               <OAuth />

//               <div className='mt-4 text-left'>
//                 <p>Not registered yet? <Link to='/register' className='text-[#16423C]'>Create an Account</Link></p>
//               </div>
//             </form>
//           </div>
//        </div>

//   {/* {error && <p className='text-red-500 mt-5 text-left'>{error}</p>} */}
        
      
//       <div className="hidden md:flex w-1/2 h-[calc(100vh-64px)] fixed right-0 top-[64px] items-center justify-center">
//         <div className="relative w-[calc(70%+10px)] h-[calc(90%+10px)]">
//           <img 
//             src={loginImage} 
//             alt="Login Illustration" 
//             className="w-full h-full object-cover rounded-lg" 
//           />
//       <div className="absolute inset-0 bg-gradient-to-t from-customGreen to-transparent rounded-lg opacity-80"></div>
//     </div>
//   </div>

  
//   {showPopup && (
//   <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
//     <div className="bg-white p-6 rounded w-96 shadow-lg max-w-sm">
//       <p className="text-customGreen font-semibold text-center">{error}</p>
//       <div className="flex justify-center mt-4">
//         <button
//           onClick={closePopup}
//           className="bg-customGreen text-white w-40 px-4 py-2 rounded hover:bg-green-950"
//         >
//           Close
//         </button>
//       </div>
//     </div>
//   </div>
// )}


// </div>
//   );
// }



import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  loginFailure,
  loginStart,
  loginSuccess,
} from '../redux/user/userSlice';
import OAuth from '../components/OAuth';
import PDFLogo from '../assets/PDFLogo.png';
import loginImage from '../assets/loginImage.jpg';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function Login() {
  const [formData, setFormData] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showPopup, setShowPopup] = useState(false); 
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(loginStart());
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', JSON.stringify(data.token));
      
      if (data.success === false) {
        dispatch(loginFailure(data.message));
        setShowPopup(true);
        return;
      }
      dispatch(loginSuccess(data.rest));
      if (document.referrer.includes('/register')) {
        navigate('/');
      } else {
        navigate(-1);
      }
    } catch (error) {
      dispatch(loginFailure(error.message));
    }
  };
  const closePopup = () => setShowPopup(false);

  return (
    <div className='flex h-screen'>
      <div className='w-full md:w-1/2 p-12 flex flex-col justify-center'>
       <div className="flex items-center justify-center h-full mt-[-60px]">
          <img src={PDFLogo} alt="UniBoard.lk" className="h-52" />
        </div>

        <div className="ml-[20px] ">
          <div className="mt-[-60px]">
            <h2 className="text-xl font-bold text-left ">Welcome to UniBoard.lk</h2>
            <p className="text-gray-500  text-sm text-left">
              Discover affordable and convenient boarding near your campus!
            </p>
            <p className="text-gray-500  text-sm text-left">
              Log in to find options based on your university and location looking for housing.
            </p>
            <p className="text-gray-500 mb-8 text-sm text-left">
              Your perfect place is just a few clicks away!
            </p>
          </div>

          <form onSubmit={handleSubmit} className='w-full max-w-md space-y-5'>
            <Box component="div" sx={{ '& > :not(style)': { m: 1, width: '100%' } }}>
              <TextField
                label="Email"
                variant="outlined"
                type="email"
                id="email"
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
              />
              <TextField
                label="Password"
                variant="outlined"
                type={showPassword ? 'text' : 'password'}
                id="password"
                onChange={handleChange}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: '#16423C', // Outline color when focused
                    },
                    color: '#16423C', // Input text color
                  },
                  '& .MuiInputLabel-root': {
                    color: '#707070', // Label color
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#16423C', // Label color when focused
                  },
                }}
              />
            </Box>

            <div className='flex items-center'>
              <input
                type='checkbox'
                id='showPassword'
                className="mr-2 accent-customGreen"
                onChange={() => setShowPassword(!showPassword)}
              />
              <label htmlFor='showPassword'>Show Password</label>
            </div>

            <button
              disabled={loading}
              className='bg-[#16423C] border-2 h-14 font-semibold text-white p-3 text-lg  w-full rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
            >
              {loading ? 'Loading...' : 'Log In'}
            </button>

            <OAuth />

            <div className='mt-4 text-left '>
              <p>Not registered yet? <Link to='/register' className='text-[#16423C] font-semibold'>Create an Account</Link></p>
            </div>
          </form>
        </div>
      </div>

      {/* Error popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded w-96 shadow-lg max-w-sm">
            <p className="text-customGreen font-semibold text-center">{error}</p>
            <div className="flex justify-center mt-4">
              <button
                onClick={closePopup}
                className="bg-customGreen text-white w-40 px-4 py-2 rounded hover:bg-green-950"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="hidden md:flex w-1/2 h-[calc(100vh-64px)] fixed right-0 top-[64px] items-center justify-center">
        <div className="relative w-[calc(90%+10px)] h-[calc(90%+10px)]">
          <img 
            src={loginImage} 
            alt="Login Illustration" 
            className="w-full h-full object-cover rounded-md" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent rounded-md opacity-80"></div>
        </div>
      </div>
    </div>
  );
}
