import React, { useEffect, useState } from "react";
import "./CSS/ShopCategory.css";

import Item from "../Components/Item/Item";
import { Link } from "react-router-dom";
import { backend_url } from "../App";

const ShopCategory = (props) => {

  const [allproducts, setAllProducts] = useState([]);

  const fetchInfo = () => { 
    fetch(`${backend_url}/api/place/allplaces`) 
            .then((res) => res.json()) 
            .then((data) => setAllProducts(data))
    }

    useEffect(() => {
      fetchInfo();
    }, [])
    console.log(props.category);
    
  return (
    <div className="shopcategory">
      <img src={props.banner} className="shopcategory-banner" alt="" />
      <div className="shopcategory-indexSort">
        <p>{props.category!=="Explore"?<span>Showing 1 - 12 out of 24 products.</span>:<span style={{backgroundColor:"#ffeb3b", padding: "20px", textAlign: "center", borderRadius:"10px",boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" ,margin:"20px"}}>40% off on our each services. </span>}</p>
       
      </div>
      
      {props.category!=="Explore"?<div className="shopcategory-products">
        {allproducts.map((item,i) => {
            if(props.category===item.category)
            {
              return <Item id={item.id} key={i} name={item.name} image={item.image}  new_price={item.new_price} old_price={item.old_price}/>;
            }
            else
            {
              return null;
            }
        })}
      </div>:<div className="shopcategory-products">
        {allproducts.map((item,i) => {
            
          return <Item id={item.id} key={i} name={item.name} image={item.image}  new_price={item.new_price} old_price={item.old_price}/>;
            
           
        })}
      </div>
      }
      <div className="shopcategory-loadmore">
      {props.category!=="Explore" && <button onClick={()=>props.setMenu("Explore More")}><Link to='/explore More' style={{ textDecoration: 'none' }}>Explore More</Link></button>}
      </div>
    </div>
  );
};

export default ShopCategory;
