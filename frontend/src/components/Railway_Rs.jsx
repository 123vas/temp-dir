import React, { useState } from 'react';
import "../components/app.css"

import Fbottom from "./Fbottom";
const RailwayForm = () => {
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    request_id: '',
    received_quantity: '',
    mine_id: '',
    Customer_id: '',
    Customer_name: '',
    Schedule_in_time: '',
    Schedule_in_date: '',
    Schedule_out_time: '',
    Schedule_out_date: '',
  });

  const handleChange = (e) => {
    const {name , value} = e.target;
    const updatedFormData = {
        ...formData,
        [name]:value,
    }
    setFormData(updatedFormData);
    console.log(updatedFormData);
  };

  const handleSubmit = (e) => {
      e.preventDefault();
  
      fetch('http://localhost:5000/Request-entry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data); 
        })
        .catch((error) => {
          console.error('Error inserting user data:', error)
        });
    };



  return (
    < > 
   <div className="headerH">
           <img src="./src/Assets/ashok.png" alt="Logo 1" className="logo" id="logo1" />
          <h1 className="ministry_of_coal">Ministry of coal</h1>
          <img src="./src/Assets/G20.png" alt="Logo 2" className="logo" id="logo2" /> 
        </div>
        <div className="navbar" style={{ display: 'inline-block', width: '100%' }}>
          <img src="/src/Assets/actual_logo.png" alt="" style={{height:"50px",width:"100px",marginLeft:"5px",marginTop:"3px"}}/>
        </div> 
    <div className='in-body'>
      {success ? (
        <section>
          <h1>Success!</h1>
        </section>
      ) : (
    <div className="data-form-container">
      <h2>Request Form</h2>

      <form onSubmit={handleSubmit} className='inward-form'>
      
          <label>
            Request ID:
            <input type="text" name="request_id" value={formData.request_id} onChange={handleChange} />
          </label>
        

        
          <label>
            Received Quantity:
            <input type="number" name="received_quantity" value={formData.received_quantity} onChange={handleChange} />
          </label>
       
          <label>
            Customer ID:
            <input type="text" name="Customer_id" value={formData.Customer_id} onChange={handleChange} />
          </label>  
        
          <label>
            Customer Name:
            <input type="text" name="Customer_name" value={formData.Customer_name} onChange={handleChange} />
          </label>

          <label>
            Mine ID:
            <input type="text" name="mine_id" value={formData.mine_id} onChange={handleChange} />
          </label>       
          <label>
          Schedule_in_Date:
            <input type="date" name="Schedule_in_date" value={formData.Schedule_in_date} onChange={handleChange} />
          </label>
        
          <label>
          Schedule_in_time:
            <input type="time" name="Schedule_in_time" value={formData.Schedule_in_time} onChange={handleChange} />
          </label>
        
          <label>
          Schedule_out_Date:
            <input type="date" name="Schedule_out_date" value={formData.Schedule_out_date} onChange={handleChange} />
          </label>
          <label>
          Schedule_out_time:
            <input type="time" name="Schedule_out_time" value={formData.Schedule_out_time} onChange={handleChange} />
          </label>

        <button type="submit">Submit</button>
      </form>
     
    </div>
      )}
      </div>
      <Fbottom/>
         </> 
  );
};

export default RailwayForm;