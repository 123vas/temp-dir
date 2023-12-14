import React from "react";
import '../components/app.css'
import Header from "./Header";
import Fbottom from "./Fbottom";
import { useState, useEffect, useRef } from "react";
import { useMineId } from "../api/context";

function RequestScheduleStatus() {

    const [data, setData] = useState([]);
    const [selectedMineId, setSelectedMineId] = useState('');
    const [filteredData, setFilteredData] = useState([]);



  const [success, setSuccess] = useState(false);

  const { mineId } = useMineId();
  useEffect(() => {
    fetch(`http://localhost:5000/requestScheduled?mineId=${mineId}`) // Assuming your backend server runs on the same host
      .then(response => response.json())
      .then(result => {
        setData(result.request_scheduled);
        setFilteredData(result.request_scheduled);
        console.log(result.request_scheduled);
      })
      .catch(error => console.error('Error:', error));
  }, [mineId]);

  // Handle filtering by using mine_id
  const handleFilter = e => {
    const selectedId = e.target.value;
    setSelectedMineId(selectedId);

    if (selectedId === 'all') {
      setFilteredData(data);
    } else {
      const filtered = data.filter(item => item.mine_id === selectedId);
      setFilteredData(filtered);
    }
  };

  function formatDateToDDMMYYYY(isoDate) {
    const date = new Date(isoDate);
    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const year = date.getUTCFullYear();

    return `${day}-${month}-${year}`;
  }

  const getStatus = (required,available) => {
    //reqired = qnty of req,available=opening entry
    if (required <= available) { // check column in database
      return "Available";
    } else if ((required - available) <= 2000  ) {
      return "Possible";
    } else {
      return "Rejected";
    }
  }; 
  
  return (
    < > 
    <Header/>  
      {success ? (
        <section>
          <h1>Success!</h1>
        </section>
      ) : (
     <div className="data1">
   
   <div className="Rtable">
   <h1>Request Scheduled Data</h1>
     
      <div className="Rt">
        <div style={{marginBottom:"10px"}}>
      <label htmlFor="mineIdFilter">Select Mine ID: </label>
      <select id="mineIdFilter" onChange={handleFilter} value={selectedMineId}>
        <option value="all">All</option>
        {/* mine IDs are available in the data */}
        {[...new Set(data.map(item => item.mine_id))].map(id => (
          <option key={id} value={id}>
            {id}
          </option>
        ))}
      </select></div>
   <table className="Rtable1">
        <thead>
          <tr>
            <th>Request ID</th>
            <th>Mine ID</th>
            <th>Customer ID</th>
            <th>Customer Name</th>
            <th>Quantity No</th>
            <th>Scheduled InTime</th>
            <th>Scheduled InDate</th>
            <th>Scheduled OutTime</th>
            <th>Scheduled OutDate</th>
            <th>Scheduled Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={item.Request_ID}>
              <td>{item.Request_ID}</td>
              <td>{item.mine_id}</td>
              <td>{item.Customer_ID}</td>
              <td>{item.Customer_Name}</td>
              <td>{item.Quantity}</td>
              <td>{item.Scheduled_In_Time}</td>
              <td>{formatDateToDDMMYYYY(item.Scheduled_In_Date)}</td>
              <td>{item.Scheduled_Out_time}</td>
              <td>{formatDateToDDMMYYYY(item.Scheduled_Out_date)}</td>
              {/* <td>{item.opening_entry}</td> */}
              <td className={`status-${getStatus(item.Quantity, item.opening_entry)}`}>
                {getStatus(item.Quantity,item.opening_entry)}
                </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
   </div>
        </div>
        
      )}
   <Fbottom/>
      </> 
  );
}

export default RequestScheduleStatus;