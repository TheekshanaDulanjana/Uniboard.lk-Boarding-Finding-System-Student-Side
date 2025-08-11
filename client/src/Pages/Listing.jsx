import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { useSelector } from 'react-redux';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import { FaBus, FaClipboardList, FaGlobe, FaHome, FaKey, FaMailBulk, FaMapMarkedAlt, FaMapMarkerAlt, FaMobile, FaParking, FaRupeeSign, FaShareSquare, FaStar, FaStore, FaUniversalAccess, FaUniversity, FaUser, FaUserCheck, FaUserGraduate, FaVenusMars } from 'react-icons/fa';
import React from 'react';
import MapComponent from '../components/MapComponent';
import moment from 'moment';

SwiperCore.use([Navigation]);

export default function Listing() {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);
  const [newFeedback, setNewFeedback] = useState('');
  const [newRating, setNewRating] = useState(0);
  const [successMessage, setSuccessMessage] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false); 
  const [showMoreDetails, setShowMoreDetails] = useState(false); 
  const params = useParams();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchListingAndFeedbacks = async () => {
      setLoading(true);

      try {
        const listingRes = await fetch(`/api/listing/get/${params.listingId}`);
        const listingData = await listingRes.json();

        if (listingData.success === false || listingData.isBooked) {
          setError(true);
          setLoading(false);
          return;
        }

        setListing(listingData);

        const feedbacksRes = await fetch(`/api/feedback/${params.listingId}`);
        const feedbacksData = await feedbacksRes.json();

        if (feedbacksData.success) {
          setFeedbacks(feedbacksData.feedbacks);
          
        } else {
          console.log(feedbacksData.message);
        }
      } catch (error) {
        console.log(error); 
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchListingAndFeedbacks();
  }, [params.listingId]);


  const handleBooking = () => {
    if (!currentUser) {
      setShowLoginPopup(true);
      return;
    }

    setShowPopup(true);
  };

  const handleLoginConfirmation = () => {
    setShowLoginPopup(false);
    navigate('/login');
  };

  const handlePaymentConfirmation = (confirm) => {
    setShowPopup(false);
    if (confirm) {
   
    navigate(`/payment`, { 
        state: { 
          listingId: listing._id,
          titel: listing.titel,
          key_money: listing.key_money,
          contact_no: listing.contact_no,
          owner_name: listing.owner_name,
          email: listing.email,
          monthly_rental_fee: listing.monthly_rental_fee,
        }
      });
    }
  };

  const handleFeedbackSubmit = async () => {
    if (!currentUser) {
      setShowLoginPopup(true);
      return;
    }

    if (!newFeedback.trim() || newRating === 0) return;

    try {
      const res = await fetch(`/api/feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': JSON.parse(localStorage.getItem('token')),
        },
        body: JSON.stringify({
          listingId: params.listingId,
          feedback: newFeedback,
          rating: newRating,
          username: currentUser.username,
          avatar: currentUser.avatar,
        }),
        credentials: 'include',
      });

      const data = await res.json();
      if (data.success) {
        setFeedbacks((prevFeedbacks) => [...prevFeedbacks, data.feedback]);
        setNewFeedback('');
        setNewRating(0);
        setSuccessMessage('Feedback submitted successfully!');
        setShowSuccessPopup(true); 
        setTimeout(() => {
          setSuccessMessage('');
          setShowSuccessPopup(false); 
        }, 3000); // Automatically close this message after 3 seconds
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleStarClick = (rating) => {
    setNewRating(rating);
  };
  

  const sortedFeedbacks = feedbacks.sort((a, b) => moment(b.createdAt).valueOf() - moment(a.createdAt).valueOf());


  return (
    <main>
      {loading && (
        <div className='text-center text-2xl'>
          <p>Loading...</p>
        </div>
      )}
      {error && <p className='text-center text-2xl'>Something went wrong!</p>}
      {listing && !loading && !error && (

        <div>
  
                    
  <Swiper navigation>
  {Array.isArray(listing.image_urls) && listing.image_urls.length > 0 ? (
    listing.image_urls.map((url) => (
      <SwiperSlide key={url}>
        <div
          className='h-[550px] w-[75vw] mx-auto'
          style={{
            background: `url(${url}) center no-repeat`,
            backgroundSize: 'cover',
          }}
        ></div>
      </SwiperSlide>
    ))
  ) : (
    <SwiperSlide>
      <div className='h-[550px] w-[75vw] mx-auto flex items-center justify-center'>
        <img 
          src='https://firebasestorage.googleapis.com/v0/b/uniboard-7aecc.appspot.com/o/images%2Fistockphoto-923397736-612x612.jpg?alt=media&token=68ea80e0-880b-46f0-8f96-328678edf56a' 
          alt='No images available' 
          className='object-cover h-full w-full'
        />
      </div>
    </SwiperSlide>
  )}
</Swiper>


          <div className='fixed top-[13%] right-[3%] my-10 justify-center items-center cursor-pointer'>
            <FaShareSquare
              className='text-black'
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>

          {copied && (
            <p className='fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2'>
              Link copied!
            </p>
          )}

          

          <div className='flex flex-col max-w-4xl mx-auto'>
          <p className=' flex items-center text-slate-800   text-2xl font-bold uppercase mt-3'>
              {listing.titel}
          </p>

          <div className='flex  my-5'>
              <p className='bg-customGreen w-full max-w-[200px] text-white text-xl font-semibold text-center p-1 rounded-md'>
                LKR {listing.monthly_rental_fee}
              </p>
          </div>

            <p className='flex items-center gap-3 text-slate-600 text-md mb-3'>
              <FaMapMarkerAlt className='text-customGreen' />
              {listing.address}
            </p>
            

            <div className='border p-4 mb-4 rounded-md shadow gap-4'>
            <p className='text-slate-800'>
              <span className='font-semibold text-black'>Description - </span>
              {listing.description}
            </p>
            </div>

            <div className='mt-6'>
              <button
                onClick={() => setShowMoreDetails(!showMoreDetails)}
                className='bg-customGreen w-full motion transform transition-transform 
                duration-300 hover:scale-105 max-w-[200px] text-white text-lg text-center p-1 rounded-md'
              >
                {showMoreDetails ? 'Hide Details' : 'View More Details'}
              </button>
            </div>


            {showMoreDetails && (
              <div className='mt-8'>
                <h2 className='text-xl font-bold mb-4'> More Details</h2>
                <table className='w-full border-collapse'>
                  <tbody>
                    <tr className='border-b'>

                    <td className='p-2 font-semibold'>
                    <FaUser className="inline-block mr-1" /> Owner's Occupation' </td>
                      
                      <td className='p-2'>{listing.owner_name}</td>
                    </tr>
                    <tr className='border-b'>
                      <td className='p-2 font-semibold'>
                      <FaUserCheck  className="inline-block mr-" /> Owner Staying</td>
                      <td className='p-2'>{listing.ownser_staying ? 'Yes' : 'No'}</td>
                    
                    </tr>
                    <tr className='border-b'>
                      <td className='p-2 font-semibold'>
                      <FaUniversity  className="inline-block mr-1" />Nearest University</td>
                      <td className="p-2">
                      {listing.nearest_university}
                      </td>

                    </tr>
                    <tr className='border-b'>
                      <td className='p-2 font-semibold'>
                      <FaHome className="inline-block mr-1" />Room Type</td>
                      <td className='p-2'>{listing.room_type}</td>
                    </tr>

                    <tr className='border-b'>
                      <td className='p-2 font-semibold'>
                      <FaUserGraduate className="inline-block mr-1" />Number of student stays</td>
                      <td className='p-2'>{listing.no_of_stay_student}</td>
                    </tr>

                    <tr className='border-b'>
                      <td className='p-2 font-semibold'>
                      <FaUniversalAccess className="inline-block mr-1" />Safty</td>
                      <td className='p-2'>{listing.safty}</td>
                    </tr>

                    <tr className='border-b'>
                      <td className='p-2 font-semibold'>
                      <FaGlobe className="inline-block mr-1" />About Social Enviroment </td>
                      <td className='p-2'>{listing.social}</td>
                    </tr>

                    <tr className='border-b'>
                      <td className='p-2 font-semibold'>
                      <FaBus  className="inline-block mr-1" />Transportation to University</td>
                      <td className='p-2'>{listing.transportation}</td>
                    </tr>

                    <tr className='border-b'>
                      <td className='p-2 font-semibold'>
                      <FaParking  className="inline-block mr-1" />Parking Availability</td>
                      <td className='p-2'>{listing.pickup_space}</td>
                    </tr>

                    <tr className='border-b'>
                      <td className='p-2 font-semibold'>
                      <FaClipboardList  className="inline-block mr-1" />Facilities </td>
                      <td className='p-2'>{listing.facilities }</td>
                    </tr>

                    <tr className='border-b'>
                      <td className='p-2 font-semibold'>
                      <FaStore  className="inline-block mr-1" />Services Around the Boarding</td>
                      <td className='p-2'>{listing.proximity_to_facilities}</td>
                    </tr>

                    <tr className='border-b'>
                      <td className='p-2 font-semibold'>
                      <FaVenusMars className="inline-block mr-1" />Gender</td>
                      <td className='p-2'>{listing.gender}</td>
                    </tr>
                    <tr className='border-b'>
                      <td className='p-2 font-semibold'>
                      <FaMapMarkedAlt  className="inline-block mr-1" />Distance</td>
                      <td className='p-2'>{listing.distance} KM</td>
                    </tr>
                    <tr className='border-b'>
                      <td className='p-2 font-semibold'>
                      <FaKey  className="inline-block mr-1" />Required Key Money for </td>
                      <td className='p-2'>{listing.key_money} Month </td>
                    </tr>
                    <tr className='border-b'>
                      <td className='p-2 font-semibold'>
                      <FaRupeeSign  className="inline-block mr-1" />Monthly Rental Fee</td>
                      <td className='p-2'>LKR {listing.monthly_rental_fee}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

           <h2 className='text-xl font-bold  mt-8'>Location</h2>

           {listing.location && (
                <div className='w-full max-w-[800px] h-[400px] mx-auto mt-5'>
                  <MapComponent
                    location={{
                      latitude: listing.location.latitude,
                      longitude: listing.location.longitude,
                    }}
                  />
                </div>
              )}


            <div className='border p-4 mb-4 rounded-md shadow gap-4 mt-10 max-w-[400px]'>
              <h2 className='text-xl font-bold mb-4'>Contact Us</h2>
              <p className='flex items-center gap-2 mb-2'>

              <FaMobile/>
                <span className='font-semibold'>Contact No:</span> {listing.contact_no}
              </p>
              <p className='flex items-center gap-2 '>
                <FaMailBulk/>
                <a 
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${listing.email}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                 <span className='font-semibold '>Email: </span>  
                 <span className='hover:underline'>{listing.email}</span>
                  </a>
              </p>
            </div>


            <div className='flex justify-center my-10'>
              <button
                onClick={handleBooking}
                className='bg-customGreen  text-white px-4 py-2 
                motion transform transition-transform duration-300 hover:scale-105
                rounded-md w-44 hover:bg-green-950  uppercase'
              >
                Book Now
              </button>
            </div>
          </div>

          <div className='max-w-4xl mx-auto my-10'>
            <h2 className='text-xl font-bold mb-4'>Feedback</h2>

            
            {sortedFeedbacks.length === 0 ? (
              <p>No feedback available for this listing.</p>
            ) : (
              
              sortedFeedbacks.map((feedback) => (


                <div key={feedback._id} className='border p-4 mb-4 rounded-md shadow'>
                  <div className='flex items-center mb-2'>
                    <img src={feedback.avatar} alt={feedback.username} className="h-10 w-10 rounded-full mr-3" />
                    <h3 className='font-semibold'>{feedback.username}</h3>
                  </div> 
                  
                  <div className='flex items-center mb-2'>
                  {[...Array(5)].map((_, index) => (
                      <FaStar 
                      key={index} 
                      className={`text-${feedback.rating > index ? 'yellow-500' : 'gray-300'}`} />
                    ))}
                  </div>
                 
                  <p>{feedback.feedback}</p>
                  <p className='text-sm text-customGreen '>{moment(feedback.createdAt).format("DD/MM/YYYY  | HH:mm")}</p>
                </div>
              ))
            )}


            <div className='mt-4'>
              <h3 className='text-lg font-bold mb-2'>Leave Your Feedback</h3>
              <div className='flex items-center mb-2'>
                {[...Array(5)].map((star, index) => (
                  <FaStar
                    key={index}
                    onClick={() => handleStarClick(index + 1)}
                    className={`cursor-pointer ${
                      index < newRating ? 'text-yellow-500' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <textarea
                className='border rounded-md p-2 w-full'
                rows='4'
                placeholder='Write your feedback...'
                value={newFeedback}
                onChange={(e) => setNewFeedback(e.target.value)}
              />
              <button
                onClick={handleFeedbackSubmit}
                className='bg-customGreen text-white px-4 py-2 rounded-md hover:bg-green-950 mt-2'
              >
                Submit Feedback
              </button>

              {successMessage && (
              <p className='text-customGreen mb-4'>{successMessage}</p>
            )}

            </div>
          </div>
        </div>
      )}


      {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white p-6 rounded-md shadow-md text-center">
                  <h3 className="text-lg font-bold">Would you like to proceed with booking this boarding based on the details provided?</h3>
                  <div className="mt-4">
                      <button
                          className="bg-customGreen text-white py-2 px-4 rounded-md mr-2 hover:bg-green-900 w-44"
                          onClick={() => handlePaymentConfirmation(true)}
                      >
                          Confirm
                      </button>
                      <button
                          className="bg-white text-customGreen font-semibold py-2 px-4 w-44 rounded-md border-2 border-customGreen "
                          onClick={() => handlePaymentConfirmation(false)}
                      >
                          Cancel
                      </button>
                  </div>
              </div>
          </div>
      )}


      {showLoginPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-sm shadow-md text-center">
            <h3 className="text-lg font-bold">You need to be logged in to perform this action.</h3>
            <div className="mt-4">
              <button
                className="bg-white  text-customGreen py-2 px-4 rounded-md w-44 border-2 border-customGreen"
                onClick={handleLoginConfirmation}
              >
                Go to Login
              </button>
            </div>
          </div>
        </div>
      )}


      {showSuccessPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-md shadow-md text-center">
            <h3 className="text-lg font-bold">{successMessage}</h3>
            <div className="mt-4">
              <button
                className="bg-customGreen text-white py-2 px-4 rounded-md w-44 hover:bg-green-900"
                onClick={() => setShowSuccessPopup(false)}
              >
                Ok
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
