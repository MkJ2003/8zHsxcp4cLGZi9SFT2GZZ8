import React from 'react'
import { toast } from "react-toastify";
import "./success.css"
import { Link } from 'react-router-dom';
function message()
{
  toast.success("Your payment history has been updated.")
}

function Success() {
  return (
    <div className='body-success'>
    <div className="container">
      <h1>Payment Successful</h1>
      <p>Thank you for your payment!</p>
      <p>You can check the status of your payment by clicking the button below.</p>
      <button className="btn">
        <Link to="/cart">Check Status</Link>
      </button>
    </div>
  </div>
  )
}

export default Success;