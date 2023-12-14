import React from 'react'
import "../components/app.css"
import {
    faPhone,
    faEnvelope,
    faLocationDot,
  } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function Fbottom() {
  return (
    <div>
     
     <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Developed By</h3>
          <p>Ember, <FontAwesomeIcon icon={faLocationDot} /> Raipur, CG</p>
        </div>
        <div className="footer-section1">
          <p ><FontAwesomeIcon icon={faPhone} />  9583377227 </p>
          <p ><FontAwesomeIcon icon={faEnvelope} /> @ssipmt.com</p>
        </div>
      </div>
    </footer>
    </div>
  );
}

export default Fbottom;