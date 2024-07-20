import React, { useState,useEffect } from 'react';
import './NewsLetter.css';
import { toast } from 'react-toastify';
import { backend_url } from '../../App';

const NewsLetter = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('');
        setIsSuccess(false);
      }, 3000); // Message will disappear after 3 seconds

      // Clean up the timer
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsSuccess(false);
    if (!localStorage.getItem("auth-token")) {
      toast.error("Please Login to Subscribe");
      return;
    }
    try {
      const response = await fetch(`${backend_url}/api/subs/addSubscription`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('authToken'), 
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      setEmail('');
      if (response.ok) {
        setMessage('Subscription successful!');
        setIsSuccess(true);
        
      } else {
        setMessage(data.errors || 'An error occurred. Please try again.');
        setIsSuccess(false);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred. Please try again.');
      setIsSuccess(false);
      
    }
  };

  return (
    <div className='newsletter'>
      <h1>Want to get Update for Offers?</h1>
      <p>Subscribe to our newsletter Now and stay updated.</p>
      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          placeholder='Your email id' 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Subscribe</button>
      </form>
      {message && <p className={`message ${isSuccess ? 'success' : 'error'}`}>{message}</p>}
    </div>
  );
};

export default NewsLetter;

// import React, { useState } from 'react';
// import './NewsLetter.css';
// import Info from "./Info.js";

// const NewsLetter = () => {
//   const [email, setEmail] = useState('');
//   const [infoMessage, setInfoMessage] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setInfoMessage(null);

//     try {
//       const response = await fetch('/addSubscription', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'auth-token': localStorage.getItem('authToken'),
//         },
//         body: JSON.stringify({ email }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setInfoMessage({ message: 'Subscription successful!', type: 'success' });
//         setEmail('');
//       } else {
//         setInfoMessage({ message: data.errors || 'An error occurred. Please try again.', type: 'error' });
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       setInfoMessage({ message: 'An error occurred. Please try again.', type: 'error' });
//     }
//   };

//   return (
//     <div className='newsletter'>
//       {infoMessage && <Info message={infoMessage.message} type={infoMessage.type} />}
//       <h1>Want to get Update for Offers?</h1>
//       <p>Subscribe to our newsletter Now and stay updated.</p>
//       <form onSubmit={handleSubmit}>
//         <input 
//           type="email" 
//           placeholder='Your email id' 
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <button type="submit">Subscribe</button>
//       </form>
//     </div>
//   );
// };

// export default NewsLetter;