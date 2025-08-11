import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';


const districts = [
  'Ampara', 'Anuradhapura', 'Badulla', 'Batticaloa', 'Colombo',
  'Galle', 'Gampaha', 'Hambantota', 'Jaffna', 'Kandy',
  'Kegalle', 'Kilinochchi', 'Kurunegala', 'Mannar', 'Matale',
  'Matara', 'Monaragala', 'Mullaitivu', 'Nuwara Eliya',
  'Polonnaruwa', 'Puttalam', 'Rathnapura', 'Trincomalee',
  'Vavuniya', 'Sri Jayawardenepura Kotte',
];

const provinces = [
  'Central Province', 'Eastern Province', 'Northern Province',
  'North Western Province', 'North Central Province',
  'Sabaragamuwa Province', 'Southern Province', 'Uva Province',
  'Western Province',
];


const university = [

  'University of Colombo','University of Peradeniya','University of Sri Jayewardenepura',
  'University of Kelaniya','University of Moratuwa','University of Ruhuna',
  'Eastern University, Sri Lanka','South Eastern University of Sri Lanka','University of Jaffna',
  'Wayamba University of Sri Lanka',

  'General Sir John Kotelawala Defence University (KDU)','Sri Lanka Institute of Information Technology (SLIIT)',
  'NSBM Green University','CINEC Campus','Horizon Campus','ICBT Campus',
  'AInformatics Institute of Technology (IIT)','National Institute of Business Management (NIBM)',
  'British College of Applied Studies (BCAS)','Saegis Campus'
];


const genders = [
  'Male',
  'Female',
];

export default function Register() {
  const [formData, setFormData] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
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
//   if (formData.nic && !/^\d{9}[vVwW]?$/.test(formData.nic)) {
//     alert('NIC Number must be 9 digits followed by "v" or "w" (optional). It must be exactly 12 digits or 9 digits with a "v" or "w".');
//     return;
// }
if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
  alert('Please enter a valid email address.');
  return;
}
if (!formData.dob) {
  alert('Please select your Date of Birth.');
  return;
}
if (!formData.university) {
  alert('Please select your University.');
  return;
}
if (!formData.gender) {
  alert('Please select your Gender.');
  return;
}
if (!formData.district) {
  alert('Please select your District.');
  return;
}
if (!formData.province) {
  alert('Please select your Province.');
  return;
}
if (!formData.PName) {
  alert('Please enter your Parents Name.');
  return;
}
if (formData.PMobile && formData.PMobile.length !== 10) {
  alert('Mobile number must be exactly 10 digits.');
  return;
}
  
    try {
      setLoading(true);
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/login'); 
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className='p-16 max-w-7xl mx-auto'>
      <h1 className='text-3xl font-semibold font-poppins text-center mt-10'>Let's get you started</h1>
      <p className='text-center text-sm text-gray-600 mb-8'>Enter the details to get going uniboard.lk!</p>
      <form onSubmit={handleSubmit} className='grid grid-cols-1 md:grid-cols-3 gap-x-20 gap-y-7'>
       
      <Box>
          <TextField
            id="fullname"
            label="Full Name"
            title="Enter Your Full Name ."
            variant="outlined"
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
          />
        </Box>


        <Box>
            <TextField
              id="SMobile"
              title="Enter Your Mobile Number."
              label="Mobile Number"
              variant="outlined"
              fullWidth
              inputProps={{
                maxLength: 10,
                inputMode: 'numeric',
                pattern: "[0-9]*",
              }}
              onInput={(e) => {
                e.target.value = e.target.value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
                if (e.target.value.length > 10) e.target.value = e.target.value.slice(0, 10); // Limit to 10 digits
              }}
              onBlur={(e) => {
                if (e.target.value.length !== 10) {
                  alert('Mobile number must be exactly 10 digits');
                }
              }}
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
        </Box>



        <Box>
          <TextField
            id="username"
            title="Enter the unique username."
            label="Username"
            variant="outlined"
            fullWidth
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


        <Box>
          <Autocomplete
            disablePortal
            title="Choose your gender."
            options={genders}
            onChange={(event, value) => setFormData({ ...formData, gender: value })}
            renderInput={(params) => <TextField {...params} label="Gender" variant="outlined" fullWidth />}
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

        



        <Box>
          <TextField
            id="nic"
            title="Enter your National Identity Card Number."
            label="NIC Number"
            variant="outlined"
            fullWidth
            // onInput={(e) => {
            //   const { value } = e.target;
            //   const letters = value.match(/[vw]/gi) || [];
            //   const digits = value.replace(/[^\d]/g, '');
              
            //   if (digits.length > 11) e.target.value = digits.slice(0, 12) + (letters[0] || '');
            //   else if (letters.length > 1) e.target.value = digits + letters[0];
            //   else e.target.value = digits + (letters[0] || '');
            // }}
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
        </Box>






        <Box>
          <TextField
            id="email"
            label="Email"
             title="Enter your Email Address."
            variant="outlined"
            type="email"
            fullWidth
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


        <Box>
          <TextField
            id="dob"
            label="Date of Birth"
            title="Select Your Birthday."
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            fullWidth
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

        <Box>
          <Autocomplete
            disablePortal
             title="Choose Your University"
            options={university}
            onChange={(event, value) => setFormData({ ...formData, university: value })}
            renderInput={(params) => <TextField {...params} label="Your University" variant="outlined" fullWidth />}
            sx={{
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: '#16423C',
                },
                color: '#16423C', 
              },
              '& .MuiInputLabel-root': {
                color: '#707070', // Label color
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#16423C', // Label color when focused
              },

              //width: '300px',  // Set the desired width
              height: '50px',   // Set the desired height
              display: 'flex',
              alignItems: 'center',

            }}
          />
        </Box>
    
        <Box>
          <TextField
            id="password"
            label="Password"
            title="Create Strong Password."
            variant="outlined"
            type={showPassword ? 'text' : 'password'}
            fullWidth
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


        

        <Box>
          <TextField
            id="street"
            label="Address"
            title="Enter Your home street name."
            variant="outlined"
            fullWidth
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

        <Box>
          <TextField
            id="PName"
            label="Parents Name"
            title="Enter your Parents Name."
            variant="outlined"
            fullWidth
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

          <button
            type="submit"
            className='bg-customGreen text-white text-xl px-6 py-3 rounded-lg uppercase font-semibold hover:bg-green-950 '
          disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
 


        <Box>
          <Autocomplete
            disablePortal
            options={districts}
            title="Choose Your home District."
            onChange={(event, value) => setFormData({ ...formData, district: value })}
            renderInput={(params) => <TextField {...params} 
            label="District" variant="outlined" fullWidth />}
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

              //width: '300px',  // Set the desired width
              height: '50px',   // Set the desired height
              display: 'flex',
              alignItems: 'center',

            }}
          />
        </Box>

        <Box>
            <TextField
              id="PMobile"
              label="Parents Mobile Number"
              title="Enter your parent mobile number."
              variant="outlined"
              fullWidth
              onInput={(e) => {
                e.target.value = e.target.value.replace(/[^0-9]/g, ''); // Restrict to numbers only
                if (e.target.value.length > 10) e.target.value = e.target.value.slice(0, 10);
              }}
              onBlur={(e) => {
                if (e.target.value.length < 10) {
                  alert('Mobile number must be exactly 10 digits');
                }
              }}
              onChange={handleChange}
              inputProps={{
                inputMode: 'numeric',
                pattern: '[0-9]*',
                maxLength: 10, // Ensures no more than 10 characters
              }}
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


        <OAuth />


        <Box>
          <Autocomplete
            disablePortal
            options={provinces}
             title="Choose Your home Province."
            onChange={(event, value) => setFormData({ ...formData, province: value })}
            renderInput={(params) => <TextField {...params} label="Province" variant="outlined" fullWidth />}
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

              //width: '300px',  // Set the desired width
              height: '40px',   // Set the desired height
              display: 'flex',
              alignItems: 'center',

            }}
          />
        </Box>


        <div className='col-start-3 justify-normal -mt-4 ml-1 flex gap-2'>
          <p>Have an account?</p>
          <Link to={'/login'}>
            <span className='text-customGreen font-semibold'>Login</span>
          </Link>
        </div>
      </form>

        <div className='flex items-center -mt-[230px] justify-end  '>
            <input
              type='checkbox'
              id='showPassword'
              className="mr-2  accent-customGreen"
              onChange={() => setShowPassword(!showPassword)}
            />
            <label clas htmlFor='showPassword'>Show Password</label>
          </div>

    

      {error && <p className='text-red-500 text-center mt-48'>{error}</p>}
    
      
        </div>
  );
}
