import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import './BookingDetail.css';
import { FaUser, FaEnvelope, FaMapMarkerAlt, FaCalendarAlt, FaUsers, FaCreditCard,FaArrowLeft } from 'react-icons/fa';
import { toast } from 'react-toastify';
import {loadStripe} from '@stripe/stripe-js';
import { backend_url } from '../../App';
const apiKey = process.env.REACT_APP_STRIPE_KEY;
console.log(apiKey);
function BookingDetail() {
  const navigate = useNavigate();
  const currency = '₹';
  const location = useLocation();
  const { product,detail } = location.state||{};
  useEffect(() => {
    if (!product) {
        toast.error("Please book any place to access this page");
        navigate("/", { replace: true });
    }
}, [product, navigate]);
if(!product)
{
    return null;
}
  

  // Placeholder booking data (replace this with actual data passed as props)
  const bookingData = detail;
 

  const handleCheckout = async () => {
    // Implement checkout logic here
    if (!localStorage.getItem("auth-token")) {
        toast.error("Please Login to CheckOut");
        return;
      }
      const stripe = await loadStripe(apiKey);
    const response = await fetch(`${backend_url}/api/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('auth-token'), 
        },
        body: JSON.stringify({detail,product}),
      });
    
    
    const session = await response.json();
    const result = stripe.redirectToCheckout({
        sessionId:session.id
    });

    if(result.error)
    {
        console.log(result.error);
    }

  };

  return (
    <div className="booking-details-container">
      <div className="booking-details-card">
      <button className="back-button" onClick ={()=>navigate(-1)}>
          <FaArrowLeft /> Back
        </button>
        <h1>Booking Details</h1>
        <div className="booking-info">
          <div className="info-group">
            <h2>Personal Information</h2>
            <p><FaUser /> <strong>Name:</strong> {bookingData.name}</p>
            <p><FaEnvelope /> <strong>Email:</strong> {bookingData.email}</p>
          </div>
          <div className="info-group">
            <h2>Trip Information</h2>
            <p><FaMapMarkerAlt /> <strong>Destination:</strong> {bookingData.destination}</p>
            <p><FaCalendarAlt /> <strong>Departure:</strong> {bookingData.departureDate}</p>
            <p><FaCalendarAlt /> <strong>Return:</strong> {bookingData.returnDate}</p>
            <p><FaUsers /> <strong>Visitor:</strong> {bookingData.people}</p>
          </div>
          <div className="info-group">
            <h2>Payment Information</h2>
            <p><FaCreditCard /> <strong>Total Amount: {product.new_price}x{bookingData.people} = </strong> {currency}{(product.new_price*bookingData.people).toFixed(2)}</p>
          </div>
        </div>
        <button className="checkout-button" onClick = {handleCheckout}>
          Checkout
        </button>
      </div>
    </div>
  );
}

export default BookingDetail;







