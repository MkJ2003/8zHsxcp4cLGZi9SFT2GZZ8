import React, { useEffect, useState } from 'react'
import "./Booking.css"
import { useLocation } from 'react-router-dom';
import { useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';
import { backend_url } from '../../App';

function Booking() {
    const location = useLocation();
    const { product } = location.state||{};
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
   
    const [departureDate,setDepartureDate] = useState("");
    const [returnDate,setReturnDate] = useState("");
    const [people,setPeople] = useState("");

    const navigate = useNavigate();
    useEffect(() => {
        if (!product) {
            alert("Please book any place to access this page");
            navigate("/", { replace: true });
        }
    }, [product, navigate]);
    if(!product)
    {
        return null;
    }
    console.log(product);

    const handleSubmit = async(e) =>{
        e.preventDefault();
        if (!localStorage.getItem("auth-token")) {
            toast.error("Please Login to Book");
            return;
          }
          try {
            const response = await fetch(`${backend_url}/api/travel/booking`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('auth-token'), 
              },
              body: JSON.stringify({ name,email,destination:product.name,departureDate,returnDate,people,productid:product.id }),
            });
      
            const detail ={name,email,destination:product.name,departureDate,returnDate,people};
            setName('');
            setEmail('');
            setDepartureDate('');
          
            setReturnDate('');
            setPeople('');
            const data = await response.json();
            if (response.ok) {
                
                
              toast.success(data.message);
              navigate("/BookingDetail",{
                state:{product,detail}
                
              })
            
              
            } else {
              toast.error(data.message);
        
            }
          } catch (error) {
            toast.error('An error occurred. Please try again.');
        }  
    }

  return (
    <div className='mainContainer'>
    <div className='form-container'>
    <div className="booking-form-container">
    <div className="booking-form-image-container"></div>
    
    <div className="booking-form-form-container">
      <h1>Travel Booking</h1>
      <form className="booking-form" onSubmit = {handleSubmit}>
        <div>
          <label htmlFor="name">Full Name</label>
          <input type="text"  required placeholder="John Doe" value={name} onChange ={(e)=>setName(e.target.value)}/>
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email"  required placeholder="john@example.com" value={email} onChange ={(e)=>setEmail(e.target.value)}/>
        </div>
        <div>
          <label htmlFor="destination">Destination</label>
          <input type="text" required  value={product.name} 
          readOnly />
        </div>
        <div>
          <label htmlFor="departure-date">Departure Date</label>
          <input type="date"  required value={departureDate} onChange ={(e)=>setDepartureDate(e.target.value)} />
        </div>
        <div>
          <label htmlFor="return-date">Return Date</label>
          <input type="date"  required value={returnDate} onChange ={(e)=>setReturnDate(e.target.value)}/>
        </div>
        <div>
          <label htmlFor="travelers">Number of Travelers</label>
          <input type="text"   required value={people} onChange ={(e)=>setPeople(e.target.value)} />
         
        </div>
        <button type="submit">Book Your Adventure</button>
      </form>
    </div>
  </div>
  </div>
  <div class="circle c1"> </div> <div class="circle c2"> </div>
  </div>
  )
}

export default Booking