import React from 'react'
import "../components/app.css"
import { Link } from 'react-router-dom';
function Header() {
  return (
    <div>
     
         <div className="headerH">
           <img src="./src/Assets/ashok.png" alt="Logo 1" className="logo" id="logo1" />
          <h1 className="ministry_of_coal">Ministry of coal</h1>
          <img src="./src/Assets/G20.png" alt="Logo 2" className="logo" id="logo2" /> 
        </div>
        <div className="navbar" style={{ display: 'inline-block', width: '100%' }}>
        <img src="/src/Assets/actual_logo.png" alt="" style={{height:"50px",width:"100px",marginLeft:"5px",marginTop:"3px"}}/>
          <Link to ="/Requestscheduled">Request</Link>
          <Link to ="/Adjustment">Adjust</Link>
          <Link to="/Inwardentry">Inward</Link>
          <Link to="/Outwardentry">Outward</Link>
          <Link to="/">Home</Link>
        </div> 
    </div>
  );
}

export default Header;
