import { useEffect,useRef,useState } from "react";
import authHeader from '../services/auth-header';
import {createSearchParams, useNavigate, useNavigation} from 'react-router-dom';
import UserViewComponent  from './FlightUserView'
import "../App.css";

const myComponent = {
      height:'500px',
      overflowX: 'hidden',
      overflowY: 'scroll'
  };


let UserSearchComponent = () =>{
  
    const[records,setBooking]=useState([])
    const origin = useRef();
    const destination = useRef();
    const flightTravelDate = useRef();
  

  
    useEffect(()=>{
      fetch("http://localhost:8082/api/flight/all",{ headers: authHeader()})
      .then(res=>res.json())
      .then((result)=>{
        setBooking(result);
      }
    )
    },[])
    const [showResults, setShowResults] = useState(false);
  
           

    const toggleDisplayDivIf=()=> {  
  
      setShowResults(true)
  
    }
    
    const handleSubmit = (e,flightTravelDate,origin,destination) => {
      let a=origin.current.value;
      let b=destination.current.value;
      let c = flightTravelDate.current.value;
      
      console.log(c);
      e.preventDefault();
      fetch(`http://localhost:8082/api/flight/${c}/${a}/${b}`,{ headers: authHeader()},{
        method: 'GET',
        mode: 'no-cors',
      })
      .then(res => {  
        
        console.log(res);  
        console.log(res.data);  
        setBooking(records.filter(item => ( item.destination === b && item.origin ===a && item.flightTravelDate === c)));  
        console.log(records);
      })
     
      
    }

    console.log("home");

    return (
      

         
        <div className="container p-5 my-5 " style = {myComponent}>
            
           
            <div className="card text-center ">
  <div className="card-header bg-secondary">
   <h3 className="text-light "> Welcome to BrownField Airline </h3>
  </div>
  <div className="card-body ">
  <form >
  <div className="row">
    <div className=" col-md-5">
      <p className="float-left "><strong>From</strong></p>
      <input type="text" className="form-control" id="origin"  ref={origin} required placeholder="Origin"/>
    </div>
    <div className=" col-md-2">
    <br></br>
    <br></br>
    
    </div>
    <div className=" col-md-5">
      <p className="float-left "><strong>To</strong></p>
      <input type="text" className="form-control" id="destination" ref={destination} name="destination" placeholder="Destination"/>
    </div>
  </div>
  <div className="row">
   
    <div className=" col-md-5">
    <p className="float-left "><strong>Travel Date</strong></p>
    
       <input type="date" id="flightTravelDate" name="flightTravelDate"  ref={flightTravelDate} className="form-control" />
    </div>
    <div className=" col-md-2">
      
    </div>
    <div className=" col-md-5">
      <br></br>
    <button  className="btn btn-info "onClick={(e)=>{handleSubmit(e, flightTravelDate, origin, destination); toggleDisplayDivIf(); }} >Search for flights
  </button>
    </div>
    
  </div>
  
</form>
  </div>

  <div className="card-footer bg-secondary">
   
  </div>
</div>

<div>
  {showResults?
            <UserViewComponent data={records}/>:null}
          </div>
      </div>
    )

}
export default UserSearchComponent;
//http://localhost:8082/api/flight?flightTravelDate=${c}&origin=${a}&destination=${b}