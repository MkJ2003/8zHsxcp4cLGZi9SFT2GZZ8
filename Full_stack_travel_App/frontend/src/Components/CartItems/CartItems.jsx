import React, { useContext } from "react";
import "./CartItems.css";

import { ShopContext } from "../../Context/ShopContext";
import { currency } from "../../App";

const CartItems = () => {
 
  const {payment} =useContext(ShopContext);
  
  console.log(payment);

  return (

    <>
    <div className="header">
      <h1>Your Payment History</h1>
    </div>
    <div className="cartitems">

      <div className="cartitems-format-main">
        <p>id</p>
        <p>Place</p>
        <p>Visitor</p>
        <p>Total Cost</p>
        <p>PaymentStatus</p>
      </div>
      <hr />
      {payment.map((e,index)=>{

       
          return  <div>
                    <div className="cartitems-format-main cartitems-format">
                      <p>{index+1}</p>
                      <p cartitems-product-title>{e.place}</p>
                      <p>{e.visitor}</p>
                      
                      <p>{currency}{e.total_payment}</p>
                     <p style={{color:"green"}}>{e.payment_status}</p>
                    </div>
                     <hr />
                  </div>;
        
       
      })}
      
      
    </div>
    </>
  );
};

export default CartItems;
