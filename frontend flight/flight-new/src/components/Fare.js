import axios from 'axios';
import {useState,useEffect} from 'react';
import authHeader from '../services/auth-header';
import {useNavigate, useSearchParams} from 'react-router-dom';
let FareComponent = ()=>{
    const [searchparams] = useSearchParams();
    console.log(searchparams.get("Fid"));
    const id = parseInt(searchparams.get("Fid"));
    const [economyClass,setEconomyClassFare] = useState('');
    const [premiumClass,setPremiumClassFare] = useState('');
    const [businessClass,setBusinessClassFare] = useState('');
   
    const navigate= useNavigate();
    
    const fareId =0;

    const[records,setBooking]=useState([])

    useEffect(()=>{
      fetch(`http://localhost:8082/api/flight/${id}`)
      .then(res=>res.json())
      .then((result)=>{
        setBooking(result);
      })
    },[id]);
  

    const handleClick =(e)=>{
        e.preventDefault()
        const flight = {flightId: parseInt(searchparams.get("Fid"))};
        const Records={fareId,businessClass,economyClass,premiumClass,flight}
        console.log(Records)

        axios.post("http://localhost:8082/api/checkin/addfare",Records,{ headers: authHeader() }).then(()=>{
            
            alert("fare updated");
            console.log("Fare Updated")
            navigate('/admin',{replace:true})
           

        })

    }
    const backhandleClick=()=>{
       navigate('/search', { replace: true })
       
    }

    return (
        <div className='container p-5 my-5'>
            
            <div className="card text-center ">
  <div className="card-header bg-secondary">
   <h3 className="text-light ">  BrownField Airline Booking  </h3>
  </div>
  <div className="card-body ">

    <form>
      
            <div className="row">
        <div className="col-md-4">
            <p className="float-left"><strong>Business Class Fare</strong></p>
            <input type="NUmber" min='100' className="form-control" id="businessClassFare" required onChange={e=>setBusinessClassFare(e.target.value)} />
        </div>
        <div className="col-md-4">
        <p className="float-left"><strong>Economy Class Fare</strong></p>
                <input type="Number" min='100' className="form-control" id="economyClassFare" required onChange={e=>setEconomyClassFare(e.target.value)}/>
           
        </div>
        <div className="col-md-4">
            <p className="float-left"><strong>Premium Class Fare</strong></p>
            <input type="Number" min='100'className="form-control" id="premiumClassFare" required onChange={e=>setPremiumClassFare(e.target.value)} />
        </div>
        </div>
        
                <p className='float-left'><strong>{records.flightName}</strong></p>
                 
            
       
        <br></br>
            
          <button className='btn btn-info' onClick={backhandleClick}>Back to flight list</button><span>                                                             </span>
          <button className="btn btn-info" onClick={handleClick}>Add Fare</button>
        </form>
        </div>
        </div>
        </div>
    )
}
export default FareComponent;