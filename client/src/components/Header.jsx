import React from 'react'; 
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'; 

import logo from '../assets/logo.png'; 
export default function Header() {

  const { currentUser } = useSelector(state => state.user);

  return (
    <header className='bg-customGreen shadow-lg fixed top-0 left-0 w-full z-50'>

      <div className='flex justify-between items-center max-w-7xl mx-auto p-2'>

        <Link to='/'>
          <img
            src={logo}
            alt="Logo"
            className="w-40 h-10 object-cover"/>
        </Link>


        <form>
          <ul className='font-poppins font-normal flex gap-5 uppercase'>

            <Link to='/'><li className='hidden sm:inline text-white font-semibold hover:underline hover:decoration-yellow-600'>Home</li></Link>
            <Link to='/about'><li className='hidden sm:inline text-white font-semibold hover:underline hover:decoration-yellow-600'>About</li></Link>
            <Link to='/contact'><li className='hidden sm:inline text-white font-semibold hover:underline hover:decoration-yellow-600'>Contact Us</li></Link>
            <Link to='/faq'><li className='hidden sm:inline text-white font-semibold hover:underline hover:decoration-yellow-600'>FAQ</li></Link>

       
            {!currentUser && (
              <Link to='/register'><li className='text-yellow-600 font-semibold hover:underline hover:decoration-white'>Register</li></Link>
            )}


            <Link to='/profile'>
              {currentUser ? (
                <img src={currentUser.avatar} alt='profile' className='w-8 h-8 rounded-full object-cover'/>
              ) : (
                <li className='text-white hover:underline font-semibold hover:decoration-yellow-600'>Login</li>
              )}
            </Link>
          </ul>
        </form>
      </div>
    </header>
  );
}
