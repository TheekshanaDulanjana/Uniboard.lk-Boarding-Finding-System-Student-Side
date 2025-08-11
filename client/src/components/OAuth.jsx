import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'; 
import { app } from '../firebase'; 
import { useDispatch } from 'react-redux'; 
import { loginSuccess } from '../redux/user/userSlice'; 
import { useNavigate } from 'react-router-dom'; 

import google from '../assets/googleIcon.png';

export default function OAuth() {
  const dispatch = useDispatch(); 
  const navigate = useNavigate(); 

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider(); 
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider); 

      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: result.user.displayName, 
          email: result.user.email, 
          photo: result.user.photoURL, 
        }),
      });
      const data = await res.json(); 
      dispatch(loginSuccess(data)); 
      navigate('/'); 
    } catch (error) {
      console.log('could not sign in with google', error); 
    }
  };

  return (
    <button
    onClick={handleGoogleClick} 
    type='button'
    className='border-2 h-12 w-full border-customGreen text-customGreen p-2 rounded-lg uppercase flex items-center justify-center hover:opacity-95 '
  >
    <img src={google} alt="Google Icon" className="h-8 w-8 mr-2" />
    Continue with Google
  </button>
  
  );
}
