import React, { useEffect, useRef, useState } from 'react'
import Hero from '../Components/Hero/Hero'
import Popular from '../Components/Popular/Popular'
import Offers from '../Components/Offers/Offers'
import NewCollections from '../Components/NewCollections/NewCollections'
import NewsLetter from '../Components/NewsLetter/NewsLetter'
import { backend_url } from '../App'

const Place = ({setMenu}) => {

  const [popular, setPopular] = useState([]);
  const [newcollection, setNewCollection] = useState([]);
  
  const servicesRef = useRef(null);

  const scrollToSection = (elementRef) => {
    if (elementRef.current) {
      window.scrollTo({
        top: elementRef.current.offsetTop,
        behavior: 'smooth',
      });
    }
  };
  
  const fetchInfo = () => { 
    fetch(`${backend_url}/api/place/popularPlaces`) 
            .then((res) => res.json()) 
            .then((data) => setPopular(data))
    fetch(`${backend_url}/api/place/newPlaces`) 
            .then((res) => res.json()) 
            .then((data) => setNewCollection(data))
    }

    useEffect(() => {
      fetchInfo();
    }, [])


  return (
    <div>
      <Hero services ={servicesRef} scrollToSection ={scrollToSection}/>
      <Popular data={popular}/>
      <Offers setMenu={setMenu}/>
      <NewCollections ref={servicesRef} data={newcollection}/>
      <NewsLetter/>
    </div>
  )
}

export default Place;
