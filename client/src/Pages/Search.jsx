import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ListingItem from '../components/ListingItem';

export default function Search() {

  const navigate = useNavigate();

  const [sidebardata, setSidebardata] = useState({
    searchTerm: '',
    gender: 'all',
    room_type: 'all',
    sort: 'updatedAt',
    order: 'desc',   
  });

  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const genderFromUrl = urlParams.get('gender');
    const room_typeFromUrl = urlParams.get('room_type');
    const sortFromUrl = urlParams.get('sort');
    const orderFromUrl = urlParams.get('order');

    setSidebardata({
      searchTerm: searchTermFromUrl || '',
      gender: genderFromUrl || 'all',
      room_type: room_typeFromUrl || 'all',
      sort: sortFromUrl || 'updatedAt',
      order: orderFromUrl || 'desc',
    });

    const fetchListings = async () => {
      setLoading(true);
      setShowMore(false);
      const searchQuery = urlParams.toString();
      try {
        const res = await fetch(`/api/listing/get?${searchQuery}`);
        if (!res.ok) throw new Error('Network response was not ok');
        const data = await res.json();

        const sortedData = data.sort((a, b) => 
          new Date(b.updatedAt) - new Date(a.updatedAt));

        setShowMore(sortedData.length > 8);
        setListings(sortedData);
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
      setLoading(false);
    };

    fetchListings();
  }, [window.location.search]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setSidebardata({ ...sidebardata, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    Object.entries(sidebardata).forEach(([key, value]) => {
      urlParams.set(key, value);
    });
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const onShowMoreClick = async () => {
    const startIndex = listings.length;
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();
    try {
      const res = await fetch(`/api/listing/get?${searchQuery}`);
      if (!res.ok) throw new Error('Network response was not ok');
      const data = await res.json();
      

      const sortedData = data.sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt));

      setShowMore(sortedData.length >= 9);
      setListings([...listings, ...sortedData]);
    } catch (error) {
      console.error('Error fetching more listings:', error);
    }
  };

  return (
    <div className='flex flex-col md:flex-row my-14'>
      <div className='p-7 border-b-2 md:border-r-2 md:min-h-screen'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
      
      

        <div className="flex flex-col gap-6">
  <div className="items-center  gap-5">
    <label className="whitespace-nowrap font-semibold uppercase -ml-1 text-lg">Search Term:</label>
    <input
      type="text"
      id="searchTerm"
      placeholder="Search..."
      className="border rounded-lg p-3 w-full max-w-[350px] mt-2 -ml-2"
      value={sidebardata.searchTerm}
      onChange={handleChange}
    />
  </div>
  <label className="font-semibold mt-5 -ml-1 border-b-2 p-2 uppercase">Filter</label>
  <div className="flex gap-4 items-center -mt-2 ">
    <label className="font-semibold whitespace-nowrap uppercase">Boarding for:</label>
    <select
      id="gender"
      value={sidebardata.gender}
      onChange={handleChange}
      className="border rounded-lg p-2 w-[150px] ml-6"
    >
      <option value="all">All</option>
      <option value="male">Male</option>
      <option value="female">Female</option>
    </select>
  </div>

  <div className="flex gap-4 items-center">
    <label className="font-semibold whitespace-nowrap uppercase">Room Type:</label>
    <select
      id="room_type"
      value={sidebardata.room_type}
      onChange={handleChange}
      className="border rounded-lg p-2 w-[150px] ml-12"
    >
      <option value="all">All</option>
      <option value="single">Single Room</option>
      <option value="double">Double Room</option>
      <option value="triple">Triple Room</option>
    </select>
  </div>

  <div className="flex gap-4 items-center">
    <label className="font-semibold whitespace-nowrap uppercase">Sort:</label>
    <select
      id="sort_order"
      onChange={handleChange}
      defaultValue="updatedAt_desc"
      className="border rounded-lg p-2 w-[150px] ml-24"
    >
      <option value="updatedAt_desc">Latest</option>
      <option value="updatedAt_asc">Oldest</option>
    </select>
  </div>
</div>


          <button className='bg-customGreen text-white p-2 rounded-lg uppercase max-w-[350px] hover:bg-green-950'>
            Search
          </button>
        </form>
      </div>
      <div className='flex-1'>
        <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 mt-1'>
          Listing results:
        </h1>


        <div className='p-7 flex flex-wrap justify-center gap-10'>
          {!loading && listings.length === 0 && (
            <p className='text-xl text-slate-700'>No listing found!</p>
          )}
          {loading && (
            <p className='text-xl text-slate-700 text-center w-full'>Loading...</p>
          )}

              {!loading && listings.map((listing) => (
                <ListingItem key={listing._id} listing={listing} />
              ))}
          
          {showMore && (
            <button
              onClick={onShowMoreClick}
              className='text-customGreen hover:underline p-7 text-center w-full'
            >
              Show more
            </button>
          )}
        </div>
      </div>
     
    </div>
    
  );
}
