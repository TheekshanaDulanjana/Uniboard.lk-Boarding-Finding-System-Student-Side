import React, { useState } from 'react'; 
import { motion } from 'framer-motion'; 


const faqs = [
  {
    question: "01. Do I need to create an account to browse boarding house listings?",
    answer: "No, you do not need to create an account to view the available boarding house listings. You can browse the properties without registering. However, if you want to book a boarding house or contact the owner, you'll need to create an account."
  },
  {
    question: "02. How do I book a boarding house?",
    answer: "Once you find a boarding house you're interested in, simply sign in to your account and click the 'Book Now' button on the listing page. Follow the instructions to complete the booking process. "
  },
  {
    question: "03. Is there a fee for booking through UniBoard?",
    answer: "Yes, UniBoard charges fees for booking boarding houses."
  },
  {
    question: "04. How do I know if a boarding house is available?",
    answer: "Availability for each boarding house is updated in real-time on UniBoard. When browsing the listings, you will see availability information, and only houses with available rooms can be booked."
  },
  {
    question: "05. Can I leave a review after staying at a boarding house?",
    answer: "Yes, after your stay, you will be able to leave a review for the boarding house. Your feedback helps other students make informed decisions when choosing a place to stay."
  },
  {
    question: "06. Can I view boarding houses in a specific location?",
    answer: "Yes, you can use the search filters to specify the location you're interested in. Simply enter the city or area in the search bar, and you’ll see listings in that region."
  },
  {
    question: "07. How can I update my personal details on UniBoard?",
    answer: "You can update your personal details by logging into your account, going to your profile settings, and editing the information. Don’t forget to save the changes after updating."
  },
  {
    question: "08. Are there any security measures in place for students using UniBoard?",
    answer: "Yes, UniBoard prioritizes your safety and privacy. All owners are verified, and we encourage students to review owner profiles and read reviews from previous tenants."
  },
];

const FAQ = () => {
  const [selected, setSelected] = useState(null); 

  const toggleFAQ = (index) => {
    setSelected(selected === index ? null : index); 
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-3 text-center my-20 uppercase font-poppins">Frequently Asked Questions</h1>
      <hr className="border-t-2 border-gray-300 mt-2 mb-5 w-2/3 mx-auto" />
  <p className="text-sm mt-1 mb-6 text-center font-poppins">
        To assist you, we have compiled a list of frequently asked questions (FAQs) below. If you cannot find the information you're looking for or have additional questions, please don't hesitate to contact our customer support team. We're here to help!
      </p>
     

      <a
        href="https://mail.google.com/mail/?view=cm&fs=1&to=uniboardlk.info@gmail.com"
        target="_blank"
        rel="noopener noreferrer"
        className="block w-44 text-center mx-auto mb-8 px-6 py-2 bg-customGreen text-white font-semibold rounded-lg shadow-lg hover:bg-green-950 transition duration-300"
      >
        Get In Touch
      </a>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">

            <motion.div 
              onClick={() => toggleFAQ(index)}
              className="cursor-pointer px-6 py-4 bg-gray-100 border-b border-gray-200 text-md font-poppins font-bold hover:bg-gray-200 transition duration-300"
            >
              {faq.question}
            </motion.div>

            {selected === index && (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }} 
                className="px-6 py-4 text-gray-700 font-poppins text-sm"
              >
                {faq.answer}
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ; 
