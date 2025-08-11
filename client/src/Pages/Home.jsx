import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import 'swiper/swiper-bundle.css';

import img1 from '../assets/ss1.jpeg'; 
import img2 from '../assets/ss2.jpeg'; 
import img3 from '../assets/ss3.jpeg';
import kdu from '../assets/kdu.jpg';
import sliit from '../assets/sliit.jpg';
import iit from '../assets/iit.jpg';
import nsbm from '../assets/nsbm.jpg';
import icbt from '../assets/icbt.jpg';
import cinec from '../assets/cinec.jpg';
import horizon from '../assets/horizon.jpg';
import nibm from '../assets/nibm.jpg';
import uoc from '../assets/uoc.jpg';
import uop from '../assets/uop.jpg';
import uom from '../assets/uom.jpg';
import japura from '../assets/japura.jpg';
import uok from '../assets/uok.jpeg';
import uor from '../assets/uor.jpeg';
import uoj from '../assets/uoj.jpg';
import easten from '../assets/easten.png';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [listingCount, setListingCount] = useState(0);
  const navigate = useNavigate();


  const handleUOCClick = () => {
    navigate(`/search?searchTerm=Colombo`);
  };

  const handleUOPClick = () => {
    navigate(`/search?searchTerm=Peradeniya`);
  };
  
  const handleUOMClick = () => {
    navigate(`/search?searchTerm=UOM`);
  };
  
  const handleUSJPClick = () => {
    navigate(`/search?searchTerm=Jayawardhanapura`);
  };
  
  const handleUOKClick = () => {
    navigate(`/search?searchTerm=kalaniya`);
  };
  
  const handleUORClick = () => {
    navigate(`/search?searchTerm=ruhuna`);
  };
  
  const handleUOJClick = () => {
    navigate(`/search?searchTerm=jaffna`);
  };

  const handleEUSClick = () => {
    navigate(`/search?searchTerm=Easteren`);
  };
  


  const handleKDUClick = () => {
    navigate(`/search?searchTerm=KDU`);
  };

  const handleHorizonClick = () => {
    navigate(`/search?searchTerm=Horizon`);
  };
  
  const handleSliitClick = () => {
    navigate(`/search?searchTerm=Sliit`);
  };
  
  const handleNSBMClick = () => {
    navigate(`/search?searchTerm=NSBM`);
  };
  
  const handleICBTClick = () => {
    navigate(`/search?searchTerm=ICBT`);
  };
  
  const handleCinecClick = () => {
    navigate(`/search?searchTerm=Cinec`);
  };
  
  const handleNIBMClick = () => {
    navigate(`/search?searchTerm=NIBM`);
  };
  
  const handleIITClick = () => {
    navigate(`/search?searchTerm=IIT`);
  };
  
  

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    const urlParams = new URLSearchParams(window.location.search); // Use window.location.search
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  // Update searchTerm from URL when component mounts or URL changes
  useEffect(() => {

    
    const urlParams = new URLSearchParams(window.location.search); // Use window.location.search
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [window.location.search]);

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
    <div className="min-h-screen">

      <div className="relative">

        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 4000 }}
          modules={[Autoplay]}
          className="w-full h-[90vh]"
        >
          <div className="absolute inset-0 bg-black opacity-40 z-10"></div>
          <SwiperSlide>
            <img src={img1} alt="University 1" className="w-full h-full object-cover" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={img2} alt="University 2" className="w-full h-full object-cover" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={img3} alt="University 3" className="w-full h-full object-cover" />
          </SwiperSlide>
        </Swiper>

        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">

          <h1 className="text-4xl font-bold text-white mb-4 uppercase ">
            Seamless Hostel Reservations for University Students!
          </h1>

          <form onSubmit={handleSubmit} className="flex items-center justify-center mb-4">
          <div className="bg-black bg-opacity-30 p-4 rounded-full flex items-center w-[40rem] shadow-lg border-2 border-customGreen border-opacity-100">
          <input
              type="text"
              placeholder="Search your university..."
              className="bg-transparent flex-grow focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ color: 'white' }} 
          />

              <button type="submit">
                <FaSearch className="text-white w-4 h-4" />
              </button>
            </div>
          </form>

          <p className="text-lg text-white motion transform transition-transform duration-300 hover:scale-105">
            {listingCount} boarding's are waiting for you, around the century!
          </p>
        </div>

      </div>

      <section className="p-8">
        <h2 className="text-2xl font-poppins font-bold mb-4">Government Universities</h2>
        <div className="grid grid-cols-4 gap-4 font-poppins">

          <button 
            className="p-2 bg-white text-center shadow-xl rounded-lg transition-transform duration-300 hover:shadow-lg hover:scale-105 w-full"
            onClick={handleUOCClick} > 
            <img src={uoc} alt="UOC" className="w-full h-40 object-cover mb-2" />
            <p>University of Colombo</p>
          </button>

          <button 

            className="p-2 text-center bg-white shadow-xl rounded-lg transition-transform duration-300 hover:shadow-lg hover:scale-105 w-full"
            onClick={handleUOPClick}>
            <img src={uop} alt="UOP" className="w-full h-40 object-cover mb-2" />
            <p>University of Peradeniya</p>
          </button>

          <button 
            className="p-2 bg-white text-center shadow-xl rounded-lg transition-transform duration-300 hover:shadow-lg hover:scale-105 w-full"
            onClick={handleUOMClick}>
            <img src={uom} alt="UOM" className="w-full h-40 object-cover mb-2" />
            <p>University of Moratuwa</p>
          </button>

          <button 
            className="p-2 text-center bg-white shadow-xl rounded-lg transition-transform duration-300 hover:shadow-lg hover:scale-105 w-full"
            onClick={handleUSJPClick} >
            <img src={japura} alt="UOSJ" className="w-full h-40 object-cover mb-2" />
            <p>University of Sri Jayewardenepura</p>
          </button>

          <button 
            className="p-2 text-center bg-white shadow-xl rounded-lg transition-transform duration-300 hover:shadow-lg hover:scale-105 w-full"
            onClick={handleUOKClick} >
            <img src={uok} alt="UOK" className="w-full h-40 object-cover mb-2" />
            <p>University of Kelaniya</p>
          </button>

          <button 
            className="p-2 bg-white text-center shadow-xl rounded-lg transition-transform duration-300 hover:shadow-lg hover:scale-105 w-full"
            onClick={handleUORClick} >
            <img src={uor} alt="UOR" className="w-full h-40 object-cover mb-2" />
            <p>University of Ruhuna</p>
          </button>

          <button 
            className="p-2 text-center bg-white shadow-xl rounded-lg transition-transform duration-300 hover:shadow-lg hover:scale-105 w-full"
            onClick={handleUOJClick} >
            <img src={uoj} alt="UOJ" className="w-full h-40 object-cover mb-2" />
            <p>University of Jaffna</p>
          </button>

          <button 
            className="p-2 text-center bg-white shadow-xl rounded-lg transition-transform duration-300 hover:shadow-lg hover:scale-105 w-full"
            onClick={handleEUSClick}>
            <img src={easten} alt="EUSL" className="w-full h-40 object-cover mb-2" />
            <p>Eastern University, Sri Lanka</p>
          </button>
          
        </div>
      </section>
      <section className="p-8">
        <h2 className="text-2xl font-poppins font-bold mb-4">Private Universities</h2>
        <div className="grid grid-cols-4 gap-4 font-poppins">

          <button 
            className="p-2 text-center bg-white shadow-xl rounded-lg transition-transform duration-300 hover:shadow-lg hover:scale-105 w-full"
            onClick={handleKDUClick}>
            <img src={kdu} alt="KDU" className="w-full h-40 object-cover mb-2" />
            <p>General Sir John Kotelawala Defence University</p>
          </button>

          <button 
            className="p-2 text-center bg-white shadow-xl rounded-lg transition-transform duration-300 hover:shadow-lg hover:scale-105 w-full"
            onClick={handleHorizonClick} >
            <img src={horizon} alt="Horizon" className="w-full h-40 object-cover mb-2" />
            <p>Horizon Campus</p>
          </button>

          <button 
            className="p-2 bg-white text-center shadow-xl rounded-lg transition-transform duration-300 hover:shadow-lg hover:scale-105 w-full"
            onClick={handleSliitClick} >
            <img src={sliit} alt="SLIIT" className="w-full h-40 object-cover mb-2" />
            <p>SLIIT</p>
          </button>

          <button  
            className="p-2 text-center bg-white shadow-xl rounded-lg transition-transform duration-300 hover:shadow-lg hover:scale-105 w-full"
            onClick={handleNSBMClick} >
            <img src={nsbm} alt="NSBM" className="w-full h-40 object-cover mb-2" />
            <p>NSBM Green University</p>
          </button>

          <button 
            className="p-2 text-center bg-white shadow-xl rounded-lg transition-transform duration-300 hover:shadow-lg hover:scale-105 w-full"
            onClick={handleICBTClick} >
            <img src={icbt} alt="ICBT" className="w-full h-40 object-cover mb-2" />
            <p>ICBT Campus</p>
          </button>

          <button 
            className="p-2 text-center bg-white shadow-xl rounded-lg transition-transform duration-300 hover:shadow-lg hover:scale-105 w-full"
            onClick={handleCinecClick}>
            <img src={cinec} alt="CINEC" className="w-full h-40 object-cover mb-2" />
            <p>CINEC Campus</p>
          </button>

          <button 
            className="p-2 text-center bg-white shadow-xl rounded-lg transition-transform duration-300 hover:shadow-lg hover:scale-105 w-full"
            onClick={handleNIBMClick} >
            <img src={nibm} alt="NIBM" className="w-full h-40 object-cover mb-2" />
            <p>NIBM</p>
          </button>

          <button 
            className="p-2 text-center bg-white shadow-xl rounded-lg transition-transform duration-300 hover:shadow-lg hover:scale-105 w-full"
            onClick={handleIITClick} >
            <img src={iit} alt="IIT" className="w-full h-40 object-cover mb-2" />
            <p>IIT</p>
          </button>

        </div>
      </section>
      <Footer />
    </div>
  );
}
