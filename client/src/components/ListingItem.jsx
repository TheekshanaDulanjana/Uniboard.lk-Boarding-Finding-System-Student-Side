import { Link } from 'react-router-dom';  
import { MdLocationOn } from 'react-icons/md'; 
import { FaStar } from 'react-icons/fa';

export default function ListingItem({ listing }) {
  if (!listing) {
    return <div className='text-red-500'>Invalid listing data</div>;
  }
  
  return (
    <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]'>
      <Link to={`/listing/${listing._id}`}>

        <img
          src={
            listing.image_urls && listing.image_urls.length > 0
              ? listing.image_urls[0] // Use the first image in the array
              : 'https://firebasestorage.googleapis.com/v0/b/uniboard-7aecc.appspot.com/o/images%2Fistockphoto-923397736-612x612.jpg?alt=media&token=68ea80e0-880b-46f0-8f96-328678edf56a' // Fallback image
          }
          alt='listing cover'
          className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300'
        />

        <div className='p-3 flex flex-col gap-2 w-full'>

          <p className='truncate text-lg font-semibold text-slate-700'>
            {listing.titel}
          </p>

          <div className='flex items-center gap-1'>
            <MdLocationOn className='h-4 w-4 text-green-700' />
            <p className='text-sm text-gray-600 truncate w-full'>
              {listing.address}
            </p>
            
            <div className='flex items-center mb-2'>
              {[...Array(5)].map((_, index) => (
                <FaStar
                  key={index}
                  className={`text-${listing.avgRating > index ? 'yellow-500' : 'gray-300'}`} />
              ))}
            </div>
          </div>

          <p className='text-sm text-gray-600 line-clamp-2'>
            {listing.description}
          </p>

          <p className='text-slate-500 mt-2 font-semibold '>
            LKR {listing.monthly_rental_fee}
          </p>
          
        </div>
      </Link>
    </div>
  );
}
