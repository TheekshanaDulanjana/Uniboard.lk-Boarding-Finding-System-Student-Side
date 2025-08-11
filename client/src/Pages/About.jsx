import React from 'react';
import { useEffect, useState } from 'react';


export default function About() {
  const [listingCount, setListingCount] = useState(0);
  const [userCount, setUserCount] = useState(0);


  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const response = await fetch('/api/user/count'); 
        const data = await response.json();
        if (data.success) {
          setUserCount(data.count); 
        }
      } catch (error) {
        console.error('Error fetching user count:', error); 
      }
    };
    fetchUserCount();
  }, []);



  useEffect(() => {
    const fetchListingCount = async () => {
      try {
        const response = await fetch('/api/listing/count'); 
        const data = await response.json();
        if (data.success) {
          setListingCount(data.count); 
        }
      } catch (error) {
        console.error('Error fetching listing count:', error); 
      }
    };
    fetchListingCount();
  }, []);


  return (
    <div className=" min-h-screen flex flex-col items-center justify-center">
      <div className="w-7xl mx-auto  text-center mt-14 p-12 shadow-lg rounded-lg bg-white">
      <h1 className="text-3xl font-bold  text-center mt-5 mb-3 uppercase font-poppins">About Us</h1>
      <hr className="border-t-2 border-gray-300 mt-2 mb-10 w-96 mx-auto" />
  

        <p className="text-md text-black mb-2 font-poppins">
          Welcome to UniBoard.LK!
        </p>
        
        <p className="text-sm text-black font-poppins">
        UniBoard is a user-friendly web and mobile application 
        designed to help university  
        </p>
        <p className="text-sm text-black font-poppins">
        students in Sri Lanka find 
        affordable and convenient boarding houses near their 
        campuses. 
        </p>
        <p className="text-sm text-black font-poppins">
        Our platform makes it simple for students to 
        search for housing options by entering their 
        </p>
        <p className="text-sm text-black font-poppins">
        university name 
        and location. At the same time, boarding house owners can 
        easily list their 
        </p>
        <p className="text-sm text-black font-poppins mb-4">
        properties, providing details like photos, prices, 
        and amenities.
        </p>


        <p className="text-sm text-black font-poppins ">
        By connecting students with property owners, UniBoard 
        streamlines the housing search process
        </p>
        <p className="text-sm text-black font-poppins ">
        making it easier for 
        students to find a place that suits their needs and budget, 
        while
        </p>
        <p className="text-sm text-black font-poppins ">
        helping property owners reach the right audience. 
        Whether you're a student looking for a
        </p>
        <p className="text-sm text-black font-poppins ">
        place to stay or a 
        property owner wanting to list your boarding house,
        </p>
        <p className="text-sm text-black font-poppins mb-10 ">
        UniBoard 
        is here to simplify the process for you.
        </p>


        <div className="flex justify-center space-x-20">
          <div className="flex flex-col items-center">
            <div className="bg-customGreen text-white rounded-full h-20 w-20 flex items-center justify-center shadow-lg">
              <span className="text-2xl font-bold">{listingCount}+ </span>
            </div>
            <p className="mt-4 text-gray-700">Running Ads</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-customGreen text-white rounded-full h-20 w-20 flex items-center justify-center shadow-lg">
              <span className="text-2xl font-bold">{userCount}+</span>
            </div>
            <p className="mt-4 text-gray-700">Student Registration</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-customGreen text-white rounded-full h-20 w-20 flex items-center justify-center shadow-lg">
              <span className="text-2xl font-bold">100%</span>
            </div>
            <p className="mt-4 text-gray-700">Users Satisfaction</p>
          </div>
        </div>
      </div>
    </div>
  );
}
