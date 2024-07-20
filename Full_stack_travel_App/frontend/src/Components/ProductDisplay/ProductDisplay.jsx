import React  from "react";
import "./ProductDisplay.css";
import { useNavigate } from "react-router-dom";


import { backend_url, currency } from "../../App";
import StarRating from "../StarRating/StarRating";

const ProductDisplay = ({product}) => {

 
  const navigate = useNavigate();

  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          <img src={backend_url + product.image} alt="img" />
          <img src={backend_url + product.image} alt="img" />
          <img src={backend_url + product.image} alt="img" />
          <img src={backend_url + product.image} alt="img" />
        </div>
        <div className="productdisplay-img">
          <img className="productdisplay-main-img" src={backend_url + product.image} alt="img" />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-stars">
          <StarRating/>
        </div>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">{currency}{product.old_price}</div>
          <div className="productdisplay-right-price-new">{currency}{product.new_price}</div>
        </div>
        <div className="productdisplay-right-description">
        {product.description}
        </div>
       
        <button onClick={()=>navigate("/Booking",{
          state:{product}
        })} style={{marginTop:"20px"}}>Book Now</button>
        <p className="productdisplay-right-category"><span>Location :</span> {product.name}</p>
        <p className="productdisplay-right-category">Don't miss the chance to check out this amazing place!</p>
      </div>
    </div>
  );
};

export default ProductDisplay;
