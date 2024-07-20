import React, { useContext, useState } from 'react'
import './Navbar.css'
import { Link, NavLink } from 'react-router-dom'


import cart_icon from '../Assets/cart_icon.jpg'
import { ShopContext } from '../../Context/ShopContext'


const Navbar = () => {

  

  const {payment} = useContext(ShopContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };



  return (
    <div className='nav'>
      <Link to='/'style={{ textDecoration: 'none' }} className="nav-logo">

        <p>ExploreEase</p>
      </Link>
     <div className = "menu" onClick ={toggleMenu}>
      <span></span>
      <span></span>
      <span></span>
     </div>
      <ul  className={`nav-menu ${isMenuOpen ? 'open' : ''}`}>
        <li><NavLink to='/' style={{ textDecoration: 'none' }}>Home</NavLink></li>
        <li><NavLink to='/india' style={{ textDecoration: 'none' }}>India</NavLink></li>
        <li><NavLink to='/world' style={{ textDecoration: 'none' }}>World</NavLink></li>
        <li><NavLink to='/explore more' style={{ textDecoration: 'none' }}>Explore More</NavLink></li>
      </ul>
     
      <div className="nav-login-cart">
        {localStorage.getItem('auth-token')
        ?<button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace("/");}}>Logout</button>
        :<NavLink to='/login' style={{ textDecoration: 'none' }}><button>Login</button></NavLink>}
        <NavLink to="/cart"><img src={cart_icon} alt="cart"/></NavLink>
        <div className="nav-cart-count">{payment.length}</div>
      </div>
    </div>
  )
}

export default Navbar;
