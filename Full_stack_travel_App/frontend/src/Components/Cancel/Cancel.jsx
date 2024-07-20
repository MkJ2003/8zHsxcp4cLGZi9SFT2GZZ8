import React from 'react'
import { Link } from 'react-router-dom';
import "./cancel.css"

function Cancel() {
  return (
    <div className='body-success'>
    <div className="container">
      <h1>Payment Failed</h1>
      <p>Try again!!!</p>
      <p>You can check the status of your payment by clicking the button below.</p>
      <button className="btn">
        <Link to="/cart">Check Status</Link>
      </button>
    </div>
  </div>
  )
}

export default Cancel;