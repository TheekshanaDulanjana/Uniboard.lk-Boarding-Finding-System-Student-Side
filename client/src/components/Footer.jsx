import React from 'react';
import { FaFacebookF, FaGoogle, FaTwitter } from 'react-icons/fa';
import { FaPhoneAlt, FaEnvelope } from 'react-icons/fa'; 
import logo from '../assets/logo.png'; 

export default function Footer() {
  return (
    <footer className="bg-customGreen text-white py-12">
      <div className="container mx-auto px-4">

        <div className="md:flex justify-center mb-8">
          <div className="md:w-1/3 mb-6 md:mb-0 text-center">

            <img src={logo} alt="Logo" className="h-12 mb-2 mx-auto" /> 
            <p className="text-sm mt-3">
            UniBoard is a user-friendly web and mobile app that helps university students in Sri Lanka find affordable and convenient boarding houses near their campuses. Students can easily search for options by entering their university name and location, while boarding house owners can list their properties with details like photos and prices. By connecting students and property owners, UniBoard simplifies the housing search, making it easier for everyone involved.</p>

            <div className="flex justify-center space-x-4 mt-4"> 
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebookF className=" hover:text-yellow-600 text-2xl cursor-pointer " />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="text-2xl cursor-pointer hover:text-yellow-600" />
            </a>
            <a href="https://www.uniboard.lk" target="_blank" rel="noopener noreferrer">
              <FaGoogle className="text-2xl cursor-pointer hover:text-yellow-600" />
            </a>

            </div>
          </div>

          <div className="md:w-1/3 mb-6 md:mb-0 text-center">
              <h4 className="text-lg font-bold mb-4 text-center">Go to Your University</h4>
              <ul className="text-sm space-y-2 text-center">
                  <li><a href="https://kdu.ac.lk/" target="_blank" className="hover:text-yellow-600" >General Sir John Kotelawala Defence University</a></li>
                  <li><a href="https://www.sjp.ac.lk/" target="_blank" className="hover:text-yellow-600" >University of Sri Jayawardhanapura</a></li>
                  <li><a href="https://uom.lk/" target="_blank" className="hover:text-yellow-600" >University of Moratuwa</a></li>
                  <li><a href="https://www.kln.ac.lk/" target="_blank" className="hover:text-yellow-600" >University of Kelaniya</a></li>
                  <li><a href="https://cmb.ac.lk/" target="_blank" className="hover:text-yellow-600"> University of Colombo </a></li>
              </ul>
          </div>


          <div className="md:w-1/3 mb-6 md:mb-0 text-center">
            <h4 className="text-lg font-bold mb-4">Address</h4>
            <p className="text-sm">
              No. 01, World Trade Center,<br />
              Echelon Square,<br />
              Colombo 01,<br />
              Sri Lanka.
            </p>
            <div>
                <FaEnvelope className="inline-block mr-2 gap-4 hover:text-yellow-600" />
                <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=uniboardlk.info@gmail.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-yellow-600">
                    uniboardlk.info@gmail.com
                </a>
                <br />
                <FaPhoneAlt className="inline-block mr-2 hover:text-yellow-600" />
                <a className="hover:text-yellow-600" >+94 71 552 6761 </a> 
            </div>
          </div>
        </div>


        <div className="border-t border-yellow-600 p-4 text-center text-sm ">
          © {new Date().getFullYear()} UniBoard.Lk All rights reserved.
        </div>
      </div>
    </footer>
  );
}
