import axios from 'axios';
import {useState} from 'react';
import { useNavigate} from 'react-router-dom';
import authHeader from '../services/auth-header';
let AddFlightComponent =() =>{
    
    
    const [arrivalTime, setArrivalTime] = useState('')
    const [departureTime,setDepartureTime] = useState('')
    const [origin, setOrigin] = useState('')
    const [destination, setDestination] = useState('')
    const [flightTravelDate, setFlightTravelDate] = useState('')
    const [remainingBusinessSeats,setRemainingBusinessSeats] = useState('')
    const [remainingEconomySeats, setRemainingEconomySeats] = useState('')
    const [remainingPremiumSeats,setRemainingPremiumSeats] = useState('')
    const [flightName,setFlightName] = useState('');
    const flightId =0

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
        axios.post('http://localhost:8082/api/flight/add',Records,{ headers: authHeader() }).then(()=>{
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
      

      <div className="row">
        <div className="col-md-5">
            <p className="float-left"><strong>Origin</strong></p>
            <select id="origin" className="form-control" onChange={e=>setOrigin(e.target.value)}>
        <option >Choose...</option>
        <option>Delhi</option>
        <option>Mumbai</option>
        <option>Chennai</option>
        <option>Bangalore</option>
        <option>Hyderabad</option>
        <option>Ahmedabad</option>
        <option>Pune</option>
        <option>Kolkata</option>
      </select>
        </div>
        <div className="col-md-2"></div>
       
        <div className="col-md-5">
            <p className="float-left"><strong>Destination</strong></p>
            <select id="destination" className="form-control" onChange={e=>setDestination(e.target.value)}>
        <option  selected>Choose...</option>
        <option>Delhi</option>
        <option>Mumbai</option>
        <option>Chennai</option>
        <option>Bangalore</option>
        <option>Hyderabad</option>
        <option>Ahmedabad</option>
        <option>Pune</option>
        <option>Kolkata</option>
      </select>
        </div>
        
      </div>
    
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
            <p className="float-left"><strong>Flight Name</strong></p>
            <input type="text"  required id="flightName" className="form-control" onChange={e=>setFlightName(e.target.value)}/>
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

      <div className="row">
      <div className="col-md-5">
      <p className="float-left"><strong>No of Economy Seats</strong></p>
        <input type="Number" min="0" required id="remainingEconomySeats" className="form-control" onChange={e=>setRemainingEconomySeats(e.target.value)}/>
        </div>
        <div className="col-md-2"></div>
        <div className="col-md-5">
            <br></br>
            <br></br>
        <button className="btn btn-info " onClick={handleClick}>Add flight
  </button>
        </div>
      </div>
      
    </form>
  
  </div>

  <div className="card-footer bg-secondary">
   
  </div>
</div>

  </div>





    )
}

export default AddFlightComponent;
/*fetch("http://localhost:8082/api/flight/add",{
          mode:"no-cors",
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body: JSON.stringify(Records) //stringfy(Booking)
          
        }).then(()=>{
            console.log("New Flight Added")
            navigate('/search', { replace: true })
          

        })
        <p className="float-left"><strong>No of Economy Seats</strong></p>
            <input type="Number" min="0" required id="remainingEconomySeats" className="form-control" onChange={e=>setRemainingEconomySeats(e.target.value)}/>
       
        */