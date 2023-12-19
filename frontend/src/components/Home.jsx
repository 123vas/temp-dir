import React from 'react';
import './css/bootstrap.css';
import "../components/app.css"
import "../components/js/bootstrap.min.js"
import Fbottom from './Fbottom.jsx';
import { Link} from "react-router-dom";
import { useEffect} from "react";
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert("please login first") ;
      navigate('/'); // Redirect to the login page if token is not present
    }
  }, [navigate]);

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:5000/logout', {
        method: 'POST'
      });
      if (token) {
        localStorage.removeItem('token'); // Clear token from local storage
        navigate('/');
      } else {
        // Handle logout failure
        console.error('Logout failed:', response.statusText);
      }
    } catch (error) {
      console.error('Logout failed:', error);
      // Handle network errors or other issues
    }
  };
  
  return (
    <div>
       <div className="headerH">
           <img src="./src/Assets/ashok.png" alt="Logo 1" className="logo" id="logo1" />
          <h1 className="ministry_of_coal">Ministry of coal</h1>
          <img src="./src/Assets/G20.png" alt="Logo 2" className="logo" id="logo2" /> 
        </div>
        <div className="navbar" style={{ display: 'inline-block', width: '100%' }}>
          <img src="/src/Assets/actual_logo.png" alt="" style={{height:"50px",width:"100px",marginLeft:"5px",marginTop:"3px"}}/>
          <a href="#request">Request</a>
          <a href="#adjustment">Adjust</a>
          <a href="#in">Inward</a>
          <a href="#out">Outward</a>
          <button onClick={handleLogout}>Logout</button>
        </div> 
      <div className='Hdiv'>
    <div>
     
    <div style={{marginLeft:"5px"}}>
      <div className="row" id="images">
        <div className="col-md-2 bg-secondary">
          <div className="column-1">
            <h4>SAFETY IN COAL MINES</h4>
            <p>
              <i>
                In India, the operations in Coalmines are regulated by the Mines Act, 1952 Mine Rules – 1955, Coal Mine
                Regulation-2017and several other statutes framed thereunder. Directorate-General of Mines Safety (DGMS)
                under the Union Ministry of Labour & Employment (MOL&E) is entrusted to administer these statutes.
              </i>
            </p>
            <a href="annual-report-safety2021-22.pdf" id="link">
              <i>Click here for more details to open the chapter safety in coal mines Annual Report of 2021-2022</i>
            </a>
          </div>
        </div>
        <div className="col-md-10">
          <div id="carouselExampleAutoplaying" className="carousel slide">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src="src\Assets\coal1.jpg" className="d-block w-100" alt="..." />
              </div>
              <div className="carousel-item">
                <img src="src\Assets\coal-train.jpg" className="d-block w-100" alt="..." />
              </div>
              <div className="carousel-item">
                <img src="src\Assets\coal2.jpg" className="d-block w-100" alt="..." />
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-3" id="card-1">
          <div className="card" id="request">
            <div className="card-body">
              <h5 className="card-title">Request Schedule</h5>
              <p className="card-text">Check your scheduled request and Quantity.</p>
              <Link to="/Requestschedule" style={{color:"white"}} className="btn btn-secondary">Click</Link>
            </div>
          </div>
        </div>
        <div className="col-md-3" id="card-2">
          <div className="card" id="adjustment">
            <div className="card-body">
              <h5 className="card-title">ADJUSTMENT ENTRY</h5>
              <p className="card-text">Adjust the loss or gain amount and opening entry</p>
              <Link to="/Adjustment" style={{color:"white"}} className="btn btn-secondary">Click</Link>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card" id="in">
            <div className="card-body">
              <h5 className="card-title">INWARD ENTRY</h5>
             
              <p className="card-text">Register the total inward movement.</p>
              <Link to="/Inwardentry" style={{color:"white"}} className="btn btn-secondary">Click</Link>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card" id="out">
            <div className="card-body">
              <h5 className="card-title">OUTWARD ENTRY</h5>
              <p className="card-text">Adjust the outward entry.</p>
              <br />
              <Link to="/Outwardentry" style={{color:"white"}} className="btn btn-secondary">Click</Link>
              
            </div>
          </div>
        </div>
      </div>
    </div>

      <div className="about-website">
        <h3>About us</h3>
        <p>
          <i>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum delectus numquam magnam porro dignissimos
            consequatur necessitatibus et provident mollitia. At nostrum assumenda rem quis magnam nisi, nobis vel. Ipsam
            error consectetur corrupti!
          </i>
        </p>
      </div>
      <Fbottom/>
    </div>
    
    </div>
    
    </div>
  );
};

export default Home;

