import Navbar from "./Components/Navbar/Navbar";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Place from "./Pages/Place";
import Cart from "./Pages/Cart";
import Product from "./Pages/Product";
import Footer from "./Components/Footer/Footer";
import ShopCategory from "./Pages/ShopCategory";
import worldHead from "./Components/Assets/wtravel.png";
import indiaHead from "./Components/Assets/itravel.jpg";
import exploreHead from "./Components/Assets/etravel.jpg";
import LoginSignup from "./Pages/LoginSignup";
import Booking from "./Components/Booking/Booking";
import Notpage from "./Pages/Notpage";
import BookingDetails from "./Components/BookingDetail/BookingDetail";
import Success from "./Components/Success/Success";
import Cancel from "./Components/Cancel/Cancel";
import About from "./Pages/About";

export const backend_url = 'http://localhost:4000';
export const currency = '₹';

function App() {
  let [menu,setMenu] = useState("Home");

  return (
    <div>
      <Router>
        <Navbar menu ={menu} setMenu={setMenu}/>
        <Routes>
          <Route path="/" element={<Place setMenu={setMenu}/>} />
          <Route path="/india" element={<ShopCategory banner={indiaHead} category="India" setMenu={setMenu} />} />
          <Route path="/world" element={<ShopCategory banner={worldHead} category="World" setMenu={setMenu} />} />
          <Route path="/explore More" element={<ShopCategory banner={exploreHead} category="Explore"  setMenu={setMenu}/>} />
          
          <Route path='/product' element={<Product />}>
            <Route path=':productId' element={<Product />} />
          </Route>
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<LoginSignup/>} />
          <Route path ="/booking" element={<Booking/>}/>
          <Route path ="/BookingDetail"element ={<BookingDetails/>}/>
          <Route path ="*" element={<Notpage/>}/>
          <Route path ="/success" element ={<Success/>}/>
          <Route path ="/cancel" element = {<Cancel/>}/>
          <Route path ="/about" element = {<About/>}/>
        
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
