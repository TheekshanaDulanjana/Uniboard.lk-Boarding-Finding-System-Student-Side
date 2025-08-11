// ContactUs.jsx
import React from 'react';
import { FaEnvelope, FaMapMarkerAlt,  FaPhone,  } from 'react-icons/fa';


const handleSubmit = async (e) => {
  e.preventDefault();
  
  const formData = {
    name: e.target.name.value,
    email: e.target.email.value,
    message: e.target.message.value,
  };

  try {
    const response = await fetch('/api/mail/RequestEmails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    if (data.status === 'success') {
      alert('Email sent successfully!');
    } else {
      alert('Send email.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred.');
  }
};


const ContactUs = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center p-8 ">
      <div className="w-full md:w-1/2 p-4 ">
      <h1 className="text-3xl font-bold text-center mt-12 mb-5 uppercase font-poppins">Contact Us</h1>
      <hr className="border-t-2 border-gray-300 mt-3 mb-8 w-96 mx-auto" />


        <h2 className="text-2xl font-semibold mb-2">Get in touch</h2>
        <p className="text-gray-600 ">
        If you have any questions or need more information, 
        feel free to reach out to us. 
    </p>
    <p className="text-gray-600 ">
       You can use our contact form for easy communication, 
        or you can contact us
    </p>
    <p className="text-gray-600 ">
       directly using the details below.
    </p>
    <p className="text-gray-600 mb-6">
      We are here to help and look forward to hearing from you!
    </p>
 
        <div className="mb-6">
        <div className="flex items-center">
        <FaEnvelope className="mr-2" />
        <h3 className="text-lg font-medium">Email</h3>
        </div>
        <p className="text-gray-600">uniboardlk.info@gmail.com</p>
        </div>


          <div className="mb-6">
          <div className="flex items-center">
          <FaPhone className="mr-2" />
          <h3 className="text-lg font-medium">Mobile</h3>
          </div>
          <p className="text-gray-600">+94 71 552 6761</p>
          <p className="text-gray-600">+94 71 226 2542 </p>
        </div>

        <div>
          <div className="flex items-center">
          <FaMapMarkerAlt className="mr-2" />
          <h3 className="text-lg font-medium">Our Office Location</h3>
          </div>
          <p className="text-gray-600">No. 01, World Trade Center,</p>
          <p className="text-gray-600">Echelon Square,</p>
          <p className="text-gray-600"> Colombo 01, </p>
          <p className="text-gray-600">Sri Lanka.</p>
        </div>
      </div>




      <div className="w-full md:w-1/2 bg-gray-100 p-6 mt-24 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Drop a message!</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-customGreen"
              id="name"
              type="text"
              placeholder="Enter your Name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-customGreen"
              id="email"
              type="email"
              placeholder="Enter a valid email address"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
              Message
            </label>
            <textarea
              className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-customGreen"
              id="message"
              placeholder="Enter your message"
              rows="5"
            ></textarea>
          </div>
         
          <button
            type="submit"
            className="w-full bg-customGreen hover:bg-green-950 text-white font-bold py-2 px-4 rounded-lg"
            >
            Submit your request
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
