import React from "react";
import "./DescriptionBox.css";
import { useState,useEffect } from "react";
import { toast } from "react-toastify";
import { backend_url } from "../../App";
const DescriptionBox = ({product}) => {
  const [selected,setSelected] = useState("description");
  const [showAll, setShowAll] = useState(false);
  const [message, setMessage] = useState('');
  const [review,setReviews] = useState([]);
  const fetchReviews = async () => {
    try {
      
      const response = await fetch(`${backend_url}/api/review/reviews/${product.id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch reviews');
      }
      const data = await response.json();
      setReviews(data);
      
    } catch (err) {
        throw new Error(err);
      
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [product,message]);

  
  const displayedReviews = showAll ? review : review.slice(0, 3);


  const handleSubmit = async (e)=>{
    e.preventDefault();
    try{
      if (!localStorage.getItem("auth-token")) {
        toast.error("Please Login to comment");
        return;
      }
     const response = await fetch(`${backend_url}/api/review/addreview`,{
      method:"POST",
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('auth-token'),
      },
      body: JSON.stringify({
        message: message,
        pid: product.id,
      }),
      
     })
     const data = await response.json();
     console.log(data);
     setMessage('');
     if(!response.ok)
     {
      throw new Error(data.errors);
     }
       }catch (err)
     {
         alert(err.errors);
     }
  }

  const handleToggle = () => {
    setShowAll(!showAll);
  }

  return (
    <div className="descriptionbox">

      <div className="descriptionbox-navigator">
        <div className="descriptionbox-nav-box" onClick ={()=>setSelected("description")} style ={selected==="description"?{backgroundColor:"#000",color:"#fff"}:{color:"#000"}}>About Place</div>
        <div className="descriptionbox-nav-box fade" onClick ={()=>setSelected("review")} style ={selected==="review"?{backgroundColor:"#000",color:"#fff"}:{color:"#000"}}>Comment ({review.length})</div>
      </div>
      {
      selected==="description" ? (<div className="descriptionbox-description">
        <p>
          {product.details}
        </p>
        </div>
      ):(
        <div className="descriptionbox-review">
      <form onSubmit ={handleSubmit}>
        <input 
          type="text" 
          placeholder="Please Comment"
          value ={message}
          onChange ={(e)=>setMessage(e.target.value)}
          required
        />
        <button type="submit">Comment</button>
      </form>
      <ul className={`review-list ${showAll ? 'expanded' : ''}`}>
        {displayedReviews.map((review, index) => (
          <li key={index} className="review-item">
            <p className="review-text">{review.message}</p>
            <p className="reviewer-name">- {review.name}</p>
          </li>
        ))}
      </ul>
      {review.length > 3 && (
        <button onClick={handleToggle} className="toggle-button">
          {showAll ? 'See Less' : 'See More'}
        </button>
      )}
    </div>

  )}
  </div>
  )
};

export default DescriptionBox;
