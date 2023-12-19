import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../components/app.css"
import Fbottom from './Fbottom';
import { useNavigate } from "react-router-dom";
const UserRegister = () => {
  const navigate = useNavigate();

  const [mines, setMines] = useState([]);
  const [selectedMine, setSelectedMine] = useState('');
  function handleClick() {
    navigate("/Login");
  } 
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
    mineId: '0' // Default value for the dropdown
  });

  useEffect(() => {
    // Fetch mine data when the component mounts
    axios.get('http://localhost:5000/fetch-data/mines')
      .then(response => {
        setMines(response.data.mines);
      })
      .catch(error => {
        console.error('Error fetching mine data:', error);
      });
  }, []); // Empty dependency array ensures the effect runs once when the component mounts

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleMineChange = (event) => {
    setSelectedMine(event.target.value);
    setFormData((prevData) => ({
      ...prevData,
      mineId: event.target.value,
      mine_name: mines.find((mine) => mine.mine_id === event.target.value)?.mine_name || '',
      mine_location: mines.find((mine) => mine.mine_id === event.target.value)?.mine_location || '',
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Check if mines data is available
    if (mines.length === 0) {
      console.error('Mines data not available yet.');
      return;
    }
  
    // Get the selected mine details
    const selectedMineDetails = mines.find((mine) => mine.mine_id === selectedMine);
  
    // Send registration data to the server
    fetch('http://localhost:5000/user-data/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        mine_id: selectedMine,
        mine_name: selectedMineDetails?.mine_name || '',
        mine_location: selectedMineDetails?.mine_location || '',
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) =>{ 
        handleClick();
        console.log(data.message)
      })
      .catch((error) => console.error('Error registering user:', error));
    
  };
  

  return (
    <div>
      <div className='bodyL'>
        <h1 className='LH1'>User Registration</h1>
        <form className='Lform' onSubmit={handleSubmit}>
          <label className='Llable'>Name:</label>
          <input className='Linput' type="text" name="name" value={formData.name} onChange={handleChange} required />

          <label className='Linput'>Username:</label>
          <input className='Linput' type="text" name="username" value={formData.username} onChange={handleChange} required />

          <label className='Llable'>Password:</label>
          <input
            className='Linput'
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="off"
            required
          />

          <label htmlFor="mineDropdown">Select a Mine:</label>
          <select id="mineDropdown" value={selectedMine} onChange={handleMineChange}>
            <option value="">Select a Mine</option>
            {mines.map((mine) => (
              <option key={mine.mine_id} value={mine.mine_id}>
                {`${mine.mine_id} - ${mine.mine_name} (${mine.mine_location})`}
              </option>
            ))}
          </select>

          <button className='Lbutton' type="submit">Register</button>
        </form>
      </div>
      <Fbottom />
    </div>
  );
};

export default UserRegister;
