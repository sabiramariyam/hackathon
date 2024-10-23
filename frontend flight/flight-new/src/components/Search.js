import { useState } from "react";
import authHeader from '../services/auth-header';
import {useEffect} from 'react'
import axios from 'axios'
import {createSearchParams, useNavigate} from 'react-router-dom'


let SearchComponent=() =>{
   
   const navigate = useNavigate();

   const[records,setBooking]=useState([])

   useEffect(()=>{
     fetch("http://localhost:8082/api/flight/all",{ headers: authHeader()})
     .then(res=>res.json())
     .then((result)=>{
       setBooking(result);
     }
   )
   },[])
 
const handleClick=(e,id)=>{
 console.log(id);
   console.log(records);
    axios.delete(`http://localhost:8082/api/flight/${id}`,{ headers: authHeader() })  
      .then(res => {  
        console.log(res);  
        console.log(res.data);  
        
       
        setBooking(records.filter(item => item.id !== id));  
        window.location.reload();
      })  
     
  } 
  const  updateFareButton=(e,id)=>{
   
    navigate({
        pathname: '/farepage',
        search: createSearchParams({
            Fid: id
        }).toString()
    });
  }

  const  updateEditFlight=(e,id)=>{
   
    navigate({
        pathname: '/editflight',
        search: createSearchParams({
            Fid: id
        }).toString()
    });
  }

  const moveButtonClick=() =>{
    navigate('/addflight', { replace: true })
    
  }
  const backButtonClick=() =>{
    navigate('/admin', { replace: true })
    
  }

 


    return(
        <div className="container p-5 my-auto">
             <button className="float-start btn btn-info" onClick={backButtonClick} >Home Page</button>
           
           <button className="float-end btn btn-info" onClick={moveButtonClick} >Go to Add flights</button>
           
            <div className="card" >
  <div className="card-body">
    <table className="table table-hover mx-auto">
        
        <thead>
            <tr>
                <th>Flight Name</th>
                <th>Arrival Time</th>
                <th>Departure Time</th>
                <th>Origin</th>
                <th>Destination</th>
                <th>Travel Date</th>
                <th>Business Seats</th>
                <th>Economy Seats</th>
                <th>Premium Seats</th>
                <th>
                   
                </th>
                <th>

                </th>
            </tr>
        </thead>
        <tbody>
            {records.map((item,index)=>
                    <tr key={item.flightId}>
                      <td>{item.flightName}</td>
                        <td>{item.arrivalTime}</td>
                        <td>{item.departureTime}</td>
                        <td>{item.origin}</td>
                        <td>{item.destination}</td>
                        <td>{item.flightTravelDate}</td>
                        <td>{item.remainingBusinessSeats}</td>
                        <td>{item.remainingEconomySeats}</td>
                        <td>{item.remainingPremiumSeats}</td>
                        <td><button type="button" className="btn btn-secondary" onClick={(e)=>updateEditFlight(e,item.flightId)}>Edit Flight</button></td>
                        <td><button type="button" className="btn btn-secondary " onClick={(e)=>updateFareButton(e,item.flightId)}>Add Fare</button></td>
                        <td><button className="btn btn-secondary" onClick={(e)=>handleClick(e,item.flightId)}>Delete</button></td>
                    </tr>
            )}
        </tbody>
    </table>
   
  </div>
</div>

        </div>
    )

}
export default SearchComponent;