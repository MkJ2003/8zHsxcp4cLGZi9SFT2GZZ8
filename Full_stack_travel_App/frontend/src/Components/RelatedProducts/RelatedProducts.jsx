import React, { useEffect, useState } from 'react'
import './RelatedProducts.css'
import Item from '../Item/Item'
import { backend_url } from '../../App';

const RelatedProducts = ({category,id}) => {

  const [related,setRelated] = useState([]);

  useEffect(()=>{
    fetch(`${backend_url}/api/place/relatedplaces`,{
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({category:category}),
      })
    .then((res)=>res.json()).then((data)=>setRelated(data))
  },[])

  return (
    <div className='relatedproducts'>
      <h1 style={{color: "#2c3e50",fontFamily: "Arial, sans-serif", fontWeight: "bold", textShadow:"2px 2px 4px #aaa"}}>You May Also Like</h1>
      <hr />
      <div className="relatedproducts-item">
        {related.map((item,index)=>{
          if (id !== item.id) {
            return <Item key={index} id={item.id} name={item.name} image={item.image}  new_price={item.new_price} old_price={item.old_price}/>
          }
        })}
      </div>
    </div>
  )
}

export default RelatedProducts
