import React, { createContext, useEffect, useState } from "react";
import { backend_url } from "../App";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {

  const [products, setProducts] = useState([]);

  


  const[payment,setPaymentDetails] = useState([]);

  useEffect(() => {
    fetch(`${backend_url}/api/place/allplaces`)
      .then((res) => res.json())
      .then((data) => setProducts(data))

    

    if(localStorage.getItem("auth-token")){
      fetch(`${backend_url}/getPaymentDetails`,{
        method:'POST',
        headers:{
          'auth-token': `${localStorage.getItem("auth-token")}`,
          'Content-Type': 'application/json',
        },
        body:JSON.stringify()
      })

      .then((resp)=>resp.json())
      .then((data)=>setPaymentDetails([...data]));
    }
    
  }, [])

 


  const contextValue = { products, payment };
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
