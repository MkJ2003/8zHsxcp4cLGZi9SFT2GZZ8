import React from "react";
import "./Offers.css";

import { useNavigate } from "react-router-dom";

const Offers = ({setMenu}) => {
   const navigate = useNavigate();
  return (
    <div className="offers">
      <div className="offers-left">
        <h1>Special Offer</h1>
        <h1>Just For You</h1>
        
        <button onClick={()=>{setMenu("Explore More");navigate("/explore More")}}>Check now</button>
      </div>
      {/* <div className="offers-right">
        <img src={exclusive_image} alt="" />
      </div> */}
    </div>
  );
};

export default Offers;
