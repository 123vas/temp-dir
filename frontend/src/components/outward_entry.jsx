import React, { useState } from 'react';
import "../components/app.css"
import Header from "./Header";
import Fbottom from "./Fbottom";

const OutwardEntryForm = () => {
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    request_id: '',
    out_quantity: '',
    date: '',
    rake_no: '',
    customer_id: '',
    customer_name:'',
  });

  const [errors, setErrors] = useState({
    request_id: '',
    out_quantity: '',
    date: '',
    rake_no: '',
    customer_id: '',
    customer_name:'',
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Validate the form fields
    if (!validateForm()) {
        console.error('Invalid data. Please check the fields.');
        return;
      }

    fetch('http://localhost:5000/outward-entry', {
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = {
        ...formData,
        [name]: value,
      }
    setFormData(updatedFormData);
  };
  

  // perform form validation
  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    // Perform validation for each field
   if (formData.request_id.trim() === '') {
      newErrors.request_id = 'Request ID is required';
      valid = false;
    }
    
    
    if (!valid) {
      setErrors(newErrors);
    } else {
      setErrors({
        request_id: '',
        out_quantity: '',
        date: '',
        rake_no: '',
        customer_id: '',
        customer_name:'',
      });
    }

    return valid;
  };

  const isFormValid = () => {
    return (
      formData.request_id.trim() !== '' &&
      formData.out_quantity.trim() !== '' &&
      formData.date.trim() !== '' &&
      formData.rake_no.trim() !== '' &&
      formData.customer_id.trim() !== '' &&
      formData.customer_name.trim()!==''
      // Add conditions for other fields
    );
  };

  return (
    <>
     <Header/> 
    <div className='out-body'>
   
    
    
      {success ? (
        <section>
          <h1>Success!</h1>
        </section>
      ) : (
    <div className='data-form-container-out'>
    <form className='form-out' onSubmit={handleFormSubmit}>
        <label style={{marginBottom:"10px"}}>Request Id : 
            <input style={{marginLeft:"60px"}} type="text" name="request_id" value={formData.request_id} onChange={handleInputChange} placeholder="Enter request Id..." autoComplete='off' />
            {errors.request_id && <div className="error-message">{errors.request_id}</div>}
             </label>
             <br/>
        <label style={{marginBottom:"10px"}}>Out Quantity : 
            <input style={{marginLeft:"37px"}} type="text" name="out_quantity" value={formData.out_quantity} onChange={handleInputChange} placeholder="Enter Quantity..." autoComplete='off' required/>
            {errors.out_quantity && <div className="error-message">{errors.out_quantity}</div>}
            </label>
            <br/>
        <label style={{marginBottom:"10px"}}>Date : 
            <input style={{marginLeft:"115px",width:"230px"}} type="date" name="date" value={formData.date} onChange={handleInputChange} placeholder="Date (YYYY-MM-DD)" autoComplete='off' required pattern="\d{4}-\d{2}-\d{2}"/>
            {errors.date && <div className="error-message">{errors.date}</div>}
            </label><br/>
        <label style={{marginBottom:"10px"}}>Rake No : 
            <input style={{marginLeft:"81px"}} type="text" name="rake_no" value={formData.rake_no} onChange={handleInputChange} placeholder="Rake number..." autoComplete='off' required/>
            {errors.rake_no && <div className="error-message">{errors.rake_no}</div>}
            </label><br/>
        <label style={{marginBottom:"10px"}} >Customer Id: 
            <input style={{marginLeft:"51px"}} type="text" name="customer_id" value={formData.customer_id} onChange={handleInputChange} placeholder="Id..." autoComplete='off' required/>
            {errors.outward_entry_col && <div className="error-message">{errors.outward_entry_col}</div>}
            </label><br/>
            <label style={{marginBottom:"10px"}}>Customer Name: 
            <input style={{marginLeft:"15px"}} type="text" name="customer_name" value={formData.customer_name} onChange={handleInputChange} placeholder="Name..." autoComplete='off' required/>
            {errors.outward_entry_col && <div className="error-message">{errors.outward_entry_col}</div>}
            </label>
            {isFormValid() && <button type="submit">Submit</button>}
    </form>
    </div>

     
      )}
      
      <Fbottom/>
      </div>
      
         </> 
  );
};

export default OutwardEntryForm;
