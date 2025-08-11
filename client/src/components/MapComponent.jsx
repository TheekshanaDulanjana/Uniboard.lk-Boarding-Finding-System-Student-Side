
import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const MapComponent = ({ location }) => {
  const [isOpen, setIsOpen] = useState(false); 
  const mapContainerStyle = {
    height: "400px",
    width: "100%"
  };

  const center = {
    lat: location.latitude,
    lng: location.longitude,
  };

  const openGoogleMaps = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${center.lat},${center.lng}`;
    window.open(url, '_blank'); 
    setIsOpen(false); 
  };

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <div className="relative">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={13}
        >
          <Marker 
            position={center}
            onClick={() => setIsOpen(true)} 
          />
        </GoogleMap>

        {isOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white p-5 rounded shadow-lg text-center">
              <p>Would you like to go to Google Maps?</p>
              <div className="mt-4">
                <button 
                  onClick={openGoogleMaps} 
                  className="bg-customGreen text-white px-4 py-2 rounded mr-2 w-44 hover:bg-green-900 "
                >
                  Yes
                </button>
                <button 
                  onClick={() => setIsOpen(false)} 
                  className="bg-white border-2 border-customGreen text-customGreen font-semiblod px-4 py-2 rounded w-44"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </LoadScript>
  );
};

export default MapComponent;
