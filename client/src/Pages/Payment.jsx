import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {jsPDF} from 'jspdf';

import PDFLogo from '../assets/PDFLogo.png';

const Payment = ({ listing }) => {
  const location = useLocation();
  const { listingId, titel, key_money, contact_no, owner_name, email , monthly_rental_fee } = location.state || {};

  const [minimumAmount, setMinimumAmount] = useState(0); 
  const [payingAmount, setPayingAmount] = useState(''); 
  const [confirmedAmount, setConfirmedAmount] = useState(''); 
  const [errorMessage, setErrorMessage] = useState(''); 
  const [cardNumber, setCardNumber] = useState(''); 
  const [expiryDate, setExpiryDate] = useState('');
  const [error, setError] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);


    useEffect(() => {
      if (monthly_rental_fee) {
        const calculatedMinimum = (parseFloat(monthly_rental_fee) * 0.1).toFixed(2); 
        setMinimumAmount(calculatedMinimum); 
      }
    }, [monthly_rental_fee]);




  const handlePayingAmountChange = (e) => {
    setPayingAmount(e.target.value); 
  };

  const handleEnterClick = () => {
    if (Number(payingAmount) >= minimumAmount) {
      setConfirmedAmount(payingAmount); 
      setErrorMessage(''); 
    } else {
      setErrorMessage(`You need to pay at least LKR ${minimumAmount}`); 
      setConfirmedAmount(''); 
    }
  };



  const handleCardholderNameChange = (e) => {
    const value = e.target.value.replace(/[^A-Za-z ]/g, ''); 
    setCardholderName(value); 
  };
  


  const formatCardNumber = (value) => {
    const numericValue = value.replace(/\D/g, '');
    const formattedValue = numericValue.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
    setCardNumber(formattedValue); 
  };



  const handleExpiryDateChange = (e) => {
    let value = e.target.value.replace(/[^0-9]/g, ''); 
    if (value.length >= 2) {
      let month = value.slice(0, 2);
      if (parseInt(month, 10) > 12) {
        setError('Invalid month'); 
        return; 
      }
      value = month + '/' + value.slice(2); 
    }
    if (value.length > 5) {
      value = value.slice(0, 5); 
    }
    setExpiryDate(value); 
    setError(''); 
  };

  const isFutureDate = (expiry) => {
    if (!expiry || expiry.length !== 5) return false;
    const [month, year] = expiry.split('/');
    const currentDate = new Date();
    const expiryDate = new Date(`20${year}`, month - 1); 
    return expiryDate > currentDate; 
  };

  const handleBlur = () => {
    if (!isFutureDate(expiryDate)) {
      setError('Your card is expired');
    } else {
      setError('');
    }
  };

  const handlePayNow = async () => {
    handleEnterClick(); 



    if (!calculateDates) { 
      alert('Please select your booking duration!'); 
      return;
  }


    if (!confirmedAmount) {
      setPopupMessage(`You need to pay at least LKR ${minimumAmount}`);
      setShowPaymentPopup(true);
      return;
    }

    if (!cardholderName) {
      setPopupMessage('Cardholder name is required');
      setShowPaymentPopup(true);
      return;
    }

    if (cardNumber.replace(/\s/g, '').length !== 16) {
      setPopupMessage('Card number must be 16 digits');
      setShowPaymentPopup(true);
      return;
    }

    if (!expiryDate || expiryDate.length !== 5 || !isFutureDate(expiryDate)) {
      setPopupMessage('Please enter a valid expiry date in MM/YY format');
      setShowPaymentPopup(true);
      return;
    }

    if (cvv.length !== 3) {
      setPopupMessage('CVV must be 3 digits');
      setShowPaymentPopup(true);
      return;
    }

console.log('Owner Email:', email);
console.log('Student Email:', currentUser.email);
    try {
      const emailResponse = await fetch('/api/mail/sendEmails', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              ownerEmail: email, 
              studentEmail: currentUser.email, 
              title: titel,
              StudentName : currentUser.fullname,
              PaidAmount : confirmedAmount,
              OwnerContact : contact_no,
              OwnerName : owner_name,
              StudetMobile : currentUser.SMobile,
              Start : startDate,
              End : endDate,
              

          }),
      });

      if (emailResponse.ok) {
          console.log('Emails sent successfully');
      } else {
          console.error('Error sending emails');
      }
  } catch (error) {
      console.error('Error:', error);
  }


        const bookingDetails = {
          listingId: listingId, 
          userId: currentUser._id,  
          bookingTime: new Date().toISOString(), 
          amount: confirmedAmount,
          status: 'booked',
          start: startDate,
          end: endDate,
      };

      console.log("Request Data:", bookingDetails); 

      try {
          const response = await fetch('/api/booking', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'token': JSON.parse(localStorage.getItem('token')),
              },
              body: JSON.stringify(bookingDetails),
              credentials: 'include',
          });

          console.log("API Response:", response);

          if (response.ok) {
              console.log('Booking successful');
          } else {
              console.error('Booking failed');
          }
      } catch (error) {
          console.error('Error:', error);
      }

      setPopupMessage('Payment Successful');
      setShowPaymentPopup(true);
      };




  let lastReceiptNo = 1000; 
  const generateReceiptNo = () => {
    lastReceiptNo++; 
    return `R-${lastReceiptNo.toString().padStart(6, '0')}`; 
  };
  

const generatePDF = () => {
  const doc = new jsPDF();

  doc.addImage(PDFLogo, 'PNG', 20, -5, 65, 65);

  doc.setFontSize(25);
  doc.setFont('helvetica', 'bold');
  const invoiceText = "INVOICE";
  const InvWidth = doc.internal.pageSize.getWidth(); 
  const invoiceTextWidth = doc.getTextWidth(invoiceText); 
  const invoiceX = InvWidth - invoiceTextWidth - 20; 
  doc.text(invoiceText, invoiceX, 20);

  const receiptNo = generateReceiptNo();
  const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
  const currentDateTime = new Date().toLocaleString('en-US', options);
  
  const formattedDateTime = currentDateTime.replace(',', ' |'); 
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  const pageWidth = doc.internal.pageSize.getWidth(); 
  const receiptTextWidth = doc.getTextWidth(`Receipt No: ${receiptNo}`); 
  const dateTextWidth = doc.getTextWidth(formattedDateTime); 
  const receiptX = pageWidth - receiptTextWidth - 20; 
  const dateX = pageWidth - dateTextWidth - 20; 
  
  doc.text(`Receipt No: ${receiptNo}`, receiptX, 30);
  doc.text(formattedDateTime, dateX, 35);
  

  doc.setFillColor(22, 66, 60); 
  doc.rect(20, 50, 170, 10, 'F'); 
  doc.setFontSize(14);
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.text("RECEIVED FROM", 25, 57);
  

  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  
  doc.setFont("helvetica", "bold"); 
  doc.text("Name", 25, 70);
  doc.setFont("helvetica", "normal"); 
  doc.text(`: ${currentUser.fullname}`, 80, 70);
  
  doc.setFont("helvetica", "bold"); 
  doc.text("Phone", 25, 80);
  doc.setFont("helvetica", "normal"); 
  doc.text(`: ${currentUser.SMobile}`, 80, 80);
  
  doc.setFont("helvetica", "bold"); 
  doc.text("Email", 25, 90);
  doc.setFont("helvetica", "normal"); 
  doc.text(`: ${currentUser.email}`, 80, 90);
  
  doc.setFillColor(22, 66, 60);
  doc.rect(20, 100, 170, 10, 'F');
  doc.setFontSize(14);
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.text("ORDER DETAILS", 25, 107);

  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);

  doc.setFont("helvetica", "bold");
  doc.text("Boarding Title", 25, 120);
  doc.setFont("helvetica", "normal");
  doc.text(`: ${titel}`, 80, 120);

  doc.setFont("helvetica", "bold");
  doc.text("Owner's Occupation", 25, 130);
  doc.setFont("helvetica", "normal");
  doc.text(`: ${owner_name }`, 80, 130);
  

  doc.setFont("helvetica", "bold");
  doc.text("Owner Mobile", 25, 140);
  doc.setFont("helvetica", "normal");
  doc.text(`: ${contact_no}`, 80, 140);
  
  doc.setFillColor(22, 66, 60);
  doc.rect(20, 150, 170, 10, 'F');
  doc.setFontSize(14);
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.text("PAYMENT DETAILS", 25, 157);

  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.setFillColor(220, 220, 220); 
  doc.rect(20, 165, 170, 8, 'F');
  doc.setFont("helvetica", "bold");
  doc.text("Description", 25, 170);
  doc.text("Amount", 160, 170);
  doc.setFont("helvetica", "normal");

  doc.text("Per Month Fee", 25, 180);
  doc.setFont("helvetica", "bold");
  doc.text(`LKR. ${monthly_rental_fee}`, 160, 180);
  doc.setFont("helvetica", "normal");

  doc.text("Minimum Required", 25, 190);
  doc.setFont("helvetica", "bold");
  doc.text(`LKR. ${minimumAmount}`, 160, 190);
  doc.setFont("helvetica", "normal");

  doc.text("Paid Amount", 25, 200);
  doc.setFont("helvetica", "bold");
  doc.text(`LKR. ${payingAmount}`, 160, 200); 
  doc.setFont("helvetica", "normal");  

  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');

  const thankYouText = "THANK YOU!";
  const thankYouWidth = doc.getTextWidth(thankYouText);
  doc.text(thankYouText, (doc.internal.pageSize.width - thankYouWidth) / 2, 250);

  const paymentSuccessText = "PAYMENT SUCCESSFUL";
  const paymentSuccessWidth = doc.getTextWidth(paymentSuccessText);
  doc.text(paymentSuccessText, (doc.internal.pageSize.width - paymentSuccessWidth) / 2, 260);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  const copyrightText = "All Rights Reserved | uniboard.lk 2024 ";
  const copyright = doc.getTextWidth(copyrightText);
  doc.text(copyrightText, (doc.internal.pageSize.width - copyright) / 2, 285);

  doc.save('uniboard_payment.pdf');
};



const calculateDates = (duration) => {
  const currentDate = new Date(); 
  let endDate;

  if (duration === '2months') {
    endDate = new Date(currentDate); 
    endDate.setMonth(currentDate.getMonth() + 2);
  } else if (duration === '4months') {
    endDate = new Date(currentDate);
    endDate.setMonth(currentDate.getMonth() + 4);
  } else if (duration === '6months') {
    endDate = new Date(currentDate);
    endDate.setMonth(currentDate.getMonth() + 6);
  }

  // Format dates to 'YYYY-MM-DD'
  const formattedStartDate = formatDate(currentDate);
  const formattedEndDate = formatDate(endDate);

  setStartDate(formattedStartDate); 
  setEndDate(formattedEndDate); 
  storeDatesInDatabase(formattedStartDate, formattedEndDate); 
};

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const storeDatesInDatabase = (start, end) => {
  console.log("Storing dates in database: ", { start, end });
};

const handleDurationChange = (event) => {
  const selectedDuration = event.target.value;
  calculateDates(selectedDuration);
};




// const calculateDates = (duration) => {
//   const currentDate = new Date();
//   let endDate;

//   if (duration === '2months') {
//     endDate = new Date(currentDate.setMonth(currentDate.getMonth() + 2));
//   } else if (duration === '4months') {
//     endDate = new Date(currentDate.setMonth(currentDate.getMonth() + 4));
//   } else if (duration === '6months') {
//     endDate = new Date(currentDate.setMonth(currentDate.getMonth() + 6));
//   }

//   setStartDate(currentDate);
//   setEndDate(endDate);
//   storeDatesInDatabase(currentDate, endDate);
// };

// const storeDatesInDatabase = (start, end) => {
//   console.log("Storing dates in database: ", { start, end });
// };

// const handleDurationChange = (event) => {
//   const selectedDuration = event.target.value;
//   calculateDates(selectedDuration);
// };


  return (
    <div className="flex flex-col md:flex-row items-center justify-center h-screen bg-gray-100">

      <div className="bg-white p-8 ml-10 h-2/3 rounded-lg shadow-lg w-full md:w-1/2">
        <h1 className="text-2xl font-bold mb-4 text-center">{titel}</h1>
        <div className="mb-1">
          <p className="text-lg font-semibold">
            Rental Fee Per Month: <span className="text-customGreen">LKR {monthly_rental_fee}</span>
          </p>
        </div>
         <p className="text-sm text-red-600 mb-4">
          *To secure your boarding reservation, pay at least 10% of the monthly fee.
          This confirms your booking and reserves your spot.</p>
          
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">The minimum amount you are required to pay.</label>
          <div className="flex w-80 items-center border border-gray-300 rounded bg-gray-200">
            <span className="p-2 text-gray-700">LKR</span>
            <p className="border-none p-2 w-full bg-gray-200 text-gray-700">{minimumAmount}</p>
          </div>
        </div>




        

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Please enter the amount you are paying</label>
          <div className="flex items-center border w-80 border-gray-300 rounded">
            <span className="p-2 rounded-l">LKR</span>
            <input
              type="string"
              value={payingAmount}
              onChange={(e) => {
                const value = e.target.value;
                // Allow only numeric values
                if (/^\d*$/.test(value)) {
                  handlePayingAmountChange(e); // Call your original handler
                }
              }}
              className="border-0 p-2 w-full rounded-r focus:outline-none"
              placeholder="Enter paying amount"
              title="Please enter your paying amount."
            />

          </div>
        </div>

        <div className="select-duration-section h">
          <label className=' bg-customGreen border-2 border-customGreen text-white p-2 rounded uppercase'>
            Select the time Period
          </label>

          <select className="border-2 border-gray-400 rounded p-2 ml-2" onChange={handleDurationChange} >
            <option value="2months">For 2 months</option>
            <option value="4months">For 4 months</option>
            <option value="6months">For 6 months</option>
          </select>
        </div>


        <button 
            className="w-34 bg-customGreen text-white p-2 w-28 rounded mt-2 hover:bg-green-950 uppercase"
            onClick={handleEnterClick} >
            enter
          </button>
        {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>} 
      </div>

      




      
      <div className="bg-white p-8 mr-10 h-2/3 rounded-lg shadow-lg w-full md:w-1/2 mt-8 md:mt-0 md:ml-8">
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1 uppercase">The amount you pay</label>
        <div className="flex items-center border border-gray-300 rounded bg-gray-200 w-40">
          <span className="p-2 text-gray-700">LKR</span>
          <p className="border-none p-2 w-full bg-gray-200 text-gray-700">
            {confirmedAmount} 
          </p>
        </div>
      </div>



        <h2 className="text-xl font-bold mb-2">Payment Details</h2>
        <label className="block text-sm font-medium mb-1">Cardholder's Name</label>
        <input
          type="text"
          value={cardholderName} 
          onChange={handleCardholderNameChange} 
          className="border border-gray-300 p-2 w-full rounded mb-3"
          placeholder="Cardholder's Name"
          pattern="[A-Za-z]+" 
          title="Please enter letters only."
          required 
        />



        <label className="block text-sm font-medium mb-1">Card Number</label>
        <input
          type="calender"
          value={cardNumber} 
          onChange={(e) => formatCardNumber(e.target.value)} 
          className="border border-gray-300 p-2 w-full rounded mb-3"
          placeholder="XXXX XXXX XXXX XXXX" 
          title="Please enter numbers only."
          maxLength={19} 
        />

        <div className="flex justify-between mb-4">
        <div className="w-1/2 pr-1">
        <label className="block text-sm font-medium mb-1">Expiry Date (MM/YY)</label>
        <input
          type="text"
          value={expiryDate}
          onChange={handleExpiryDateChange}
          onBlur={handleBlur}
          className={`border border-gray-300 p-2 w-full rounded ${error ? 'border-gray-300' : ''}`}
          placeholder="MM/YY"
          title="Please enter future date only."
          maxLength={5}
        />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>


        <div className="w-1/2 pl-1">
           <label className="block text-sm font-medium mb-1">CVV</label>
            <input
             type="text"
            value={cvv}
            onChange={(e) => {
            const { value } = e.target;
            
             if (/^\d{0,3}$/.test(value)) {
            setCvv(value);
              }
                }}
            className="border border-gray-300 p-2 w-full rounded"
            placeholder="CVV"
            title="Please enter three digits only."
            maxLength={3}
            />
          </div>
        </div>



        <button 
          className="w-full bg-customGreen text-white p-2 rounded hover:bg-green-950"
          onClick={handlePayNow }>
          Pay Now
        </button>

        {bookingConfirmed && <p>Booking Confirmed and Thanks For Your Booking!</p>}
        

        {showPaymentPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-sm shadow-md text-center">
            <h3 className="text-lg font-bold">{popupMessage}</h3>
            <div className="mt-4 flex justify-center space-x-4">
            {popupMessage === 'Payment Successful' ? (
              <>
               <button
                className="bg-customGreen text-white py-2 px-4 w-60 rounded-md hover:bg-green-950"
                onClick={() => {
                  setShowPaymentPopup(false);
                  generatePDF();
                  setTimeout(() => {
                    navigate('/');
                  }, 4000); 
                }} 
              >
                Download Payment Receipt
               </button>

                <button
                className="bg-white font-semibold text-customGreen py-2 px-4 w-60 rounded-md border-2 border-customGreen"
                onClick={() => {
                  setShowPaymentPopup(false);
                  navigate('/');}}  >
                Thank You!
                </button>
                </>

                ) : (

                <button
                className="bg-yellow-600 text-white py-2 px-4 w-60 rounded-md hover:bg-yellow-700"
                onClick={() => setShowPaymentPopup(false)} >
                Sure!
                </button>
                )}
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
  );
};

export default Payment;

