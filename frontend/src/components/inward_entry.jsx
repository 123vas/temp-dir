import React, { useState } from 'react';
import "../components/app.css"
import Header from "./Header";
import Fbottom from "./Fbottom";
const InwardForm = () => {
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    request_id: '',
    received_quantity: '',
    mine_id: '',
    mine_name: '',
    mine_location: '',
    time: '',
    date: '',
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
  
      fetch('http://localhost:5000/inward-entry', {
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
    <Header/>  
    <div className='in-body'>
      {success ? (
        <section>
          <h1>Success!</h1>
        </section>
      ) : (
    <div className="data-form-container">
      <h2>Data Form</h2>

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
            Mine ID:
            <input type="text" name="mine_id" value={formData.mine_id} onChange={handleChange} />
          </label>
        

        
          <label>
            Mine Name:
            <input type="text" name="mine_name" value={formData.mine_name} onChange={handleChange} />
          </label>
        

        
          <label>
            Mine Location:
            <input type="text" name="mine_location" value={formData.mine_location} onChange={handleChange} />
          </label>
       

        
          <label>
            Time:
            <input type="text" name="time" value={formData.time} onChange={handleChange} />
          </label>
        

        
          <label>
            Date:
            <input type="text" name="date" value={formData.date} onChange={handleChange} />
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

export default InwardForm;