import axios from 'axios';
import {useState} from 'react';
import { useNavigate,useSearchParams} from 'react-router-dom';
import authHeader from '../services/auth-header';


let EditFlightComponent=()=>{

    const [searchparams] = useSearchParams();
    console.log(searchparams.get("Fid"));
    const flightId = parseInt(searchparams.get("Fid"));
    const [arrivalTime, setArrivalTime] = useState('')
    const [departureTime,setDepartureTime] = useState('')
    const [flightTravelDate, setFlightTravelDate] = useState('')
    const [remainingBusinessSeats,setRemainingBusinessSeats] = useState('')
    const [remainingEconomySeats, setRemainingEconomySeats] = useState('')
    const [remainingPremiumSeats,setRemainingPremiumSeats] = useState('')
    
    const origin="", destination ="", flightName=""

    const navigate = useNavigate();
    const moveButtonClick=() =>{
        navigate('/search', { replace: true })
        
      }
      const backButtonClick=() =>{
        navigate('/admin', { replace: true })
        
      }

    const handleClick=(e)=>{
        e.preventDefault()
      
        const Records={flightId,arrivalTime,departureTime,origin,flightTravelDate,destination,flightName,remainingBusinessSeats,remainingEconomySeats,remainingPremiumSeats}
        console.log(Records) //print
        axios.put(`http://localhost:8082/api/flight/update/${flightId}`,Records,{ headers: authHeader() }).then(()=>{
          alert("Flight details updated")
          navigate('/search',{replace:true})
        }).catch(function(error){
          console.log(error);
        })
    }

   

    return(
        <div className="container p-5 my-5 ">
            
        <button className="float-start btn btn-info" onClick={backButtonClick} >Home Page</button>
       
       <button className="float-end btn btn-info" onClick={moveButtonClick} >show Flights List</button>
       
    <div className="card text-center ">
<div className="card-header bg-secondary">
<h3 className="text-light ">  BrownField Airline Booking  </h3>
</div>
<div className="card-body ">
<form>
  <div className='row'>
    <div className='col-md-5'>
      <p className='float-left' ><strong>Arrival Time</strong></p>
      <input type="time"  className='form-control' id='arrivalTime' required onChange={e=>setArrivalTime(e.target.value)}/>
    </div>
    <div className='col-md-2'></div>
    <div className='col-md-5'>
      <p className='float-left'><strong>Departure Time</strong></p>
      <input type="time" className='form-control' id='departureTime' required onChange={e=>setDepartureTime(e.target.value)}/>
    </div>

  </div>

  <div className="row">
    <div className="col-md-5">
        <p className="float-left"><strong>Flight Travel Date</strong></p>
        <input type="date" required id="flightTravelDate" className="form-control" onChange={e=>setFlightTravelDate(e.target.value)}/>
    </div>
    <div className="col-md-2"></div>
    <div className="col-md-5">
    <p className="float-left"><strong>No of Economy Seats</strong></p>
    <input type="Number" min="0" required id="remainingEconomySeats" className="form-control" onChange={e=>setRemainingEconomySeats(e.target.value)}/>
    
    </div>
  </div>

  <div className="row">
  <div className="col-md-5">
        <p className="float-left"><strong>No of Premium Seats</strong></p>
        <input type="Number" min="0" required id="remainingPremiumSeats" className="form-control" onChange={e=>setRemainingPremiumSeats(e.target.value)}/>
    </div>
    <div className="col-md-2"></div>
    <div className="col-md-5">
    <p className="float-left"><strong>No of Business Seats</strong></p>
        <input type="Number" min="0" required id="remainingBusinessSeats" className="form-control" onChange={e=>setRemainingBusinessSeats(e.target.value)}/>
    
    </div>
  </div>

  
  
        <br></br>
        <br></br>
    <button className="btn btn-info " onClick={handleClick}>Update flight
</button>
   
 
  
</form>

</div>

<div className="card-footer bg-secondary">

</div>
</div>

</div>


    )
}

export default EditFlightComponent;