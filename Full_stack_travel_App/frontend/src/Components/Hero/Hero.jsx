import React from "react";
import "./Hero.css";


const Hero = ({services,scrollToSection}) => {
  return (
 
    <div className='hero'>
  
    <div className="hero-content container">
      <h1 className="hero-title">Discover Your Next Adventure</h1>
      <p className="hero-subtitle">Explore the world with us</p>
      <button className="hero-button" onClick = {()=>scrollToSection(services)}>Start Your Journey</button>
    </div>
  </div>
  );
};

export default Hero;
