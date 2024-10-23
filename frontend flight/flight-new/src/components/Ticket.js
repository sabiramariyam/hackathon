import {useState,useRef,useEffect} from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom'
import axios from 'axios'
import authHeader from '../services/auth-header';
import AuthService from '../services/auth.service';

let TicketComponent=()=>{

  
 
    const [count,setCount] = useState('');
    const [seatClass,setSeatClass]= useState('');
    const [searchparams] =useSearchParams();
    console.log(searchparams.get("Fid"));
    //const id = searchparams.get("Fid");
    const flight = {flightId: parseInt(searchparams.get("Fid"))};
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [age, setAge] = useState('');
    const [gender,setGender] = useState('');
    const [email,setEmail] = useState('');
    const [phoneNumber,setPhoneNumber] = useState('');
    const [records,setBooking]=useState([])

   // console.log(records);
    console.log(flight);
    const currentUser = AuthService.getCurrentUser();
    const user ={id:parseInt(currentUser.id)} ;
    const id=0;
    const ticketNumber=0;
    const price =0;
    const reservationDate="2000-12-12 12:30";
    const passengerId=0;
   
    const [passenger, setPassengers] = useState([]);
    const passengerSubmit = (e) => {
           e.preventDefault();
          setPassengers([...passenger, { firstName,lastName, age,gender,email,phoneNumber }]);
          setFirstName('');
          setLastName('');
          setEmail('');
          setGender('');
          setPhoneNumber('');
          setAge('');
      alert("passenger added");
      const frm = document.getElementsByName('pass-form')[0];
      frm.reset();  // Reset all form data
      return false;
       };
      console.log(passenger)

    const handleClick=(e)=>{
        e.preventDefault();
         if((!seatClass) || (!count)){
          alert("fields are required")
        }
        else{
        const Records={id,ticketNumber,price,count,seatClass,reservationDate,user,flight,passenger}
        console.log(Records) //print
        axios.post('http://localhost:8082/api/booking/completebooking',Records,{ headers: authHeader() }).then((res)=>{
          console.log(res);
          alert('Booked details completed. To confirm Booking complete payment')
          navigate('/booking');
        }).catch(function(error){
        alert('Not enough seats available')
          console.log(error);
        })
		}
    }

    const backButtonClick=() =>{
      navigate('/user', { replace: true })
    }

    const showFlight=()=>{
      navigate('/userflightlist', {replace:true})
    }
    
  const addpassengerClick =()=>{
    
      
  }

    return(
        <div className="container p-5 my-5 ">
            
        <button className="float-start btn btn-info" onClick={backButtonClick} >Home Page</button>
       
       <button className="float-end btn btn-info" onClick={showFlight} >show Flights List</button>
        <div className="card text-center ">
        <div className="card-header bg-secondary">
        <h3 className="text-light ">  BrownField Airline Booking  </h3>
        </div>
        <div className="card-body ">
         
        <div className="row">
            <div className="col-md-5" >
            <p className="float-left"><strong>Select Class Type</strong></p>
            <select id="seatClass" className="form-control"  onChange={e=>setSeatClass(e.target.value)}>
        <option>Economy</option>
        <option>Business</option>
        <option>Premium</option>
        </select>
            </div>
            <div className="col-md-2">
            </div>
            <div className="col-md-5">
            <p className="float-left"><strong>No of seats</strong></p>
            <input type="number" min='0'  required id="count" className="form-control"  onChange={e=>setCount(e.target.value)}/>
            </div>
        </div>
        <div >
        <form name="pass-form" onSubmit={passengerSubmit}>
        <div className="row">
    <div className="col-md-5">
        <p className="float-left"><strong>First Name</strong></p>
        <input type="text" id="firstName" className="form-control" required onChange={e=>setFirstName(e.target.value)}/>
    
    </div>
    <div className="col-md-2"></div>
   
    <div className="col-md-5">
        <p className="float-left"><strong>Last Name</strong></p>
        <input type="text" id="lastName" className="form-control" required onChange={e=>setLastName(e.target.value)}/>
    </div>
    
  </div>
        <div className='row'>
    <div className='col-md-5'>
      <p className='float-left' ><strong>Age</strong></p>
      <input type="number"  className='form-control' id='age' required onChange={e=>setAge(e.target.value)}/>
    </div>
    <div className='col-md-2'></div>
    <div className='col-md-5'>
      <p className='float-left'><strong>Gender</strong></p>
      <select id="gender" className="form-control" onChange={e=>setGender(e.target.value)}>
        <option >Choose...</option>
        <option>Male</option>
        <option>Female</option>
        <option>Prefer not to say</option>
      </select>
    </div>

  </div>

  <div className="row">
    <div className="col-md-5">
        <p className="float-left"><strong>Passenger Email Id</strong></p>
        <input type="email" required id="email" className="form-control" onChange={e=>setEmail(e.target.value)}/>
    </div>
    <div className="col-md-2"></div>
    <div className="col-md-5">
        <p className="float-left"><strong>Phone Number</strong></p>
        <input type="text"  required id="phonenumber" className="form-control" onChange={e=>setPhoneNumber(e.target.value)}/>
    </div>
  </div>
          <br></br>
          <br></br>
          <p className='float-start'>Click here to add passenger.. Then click Confirm Booking </p><br></br>
          <button type="submit" className='btn btn-secondary float-start'>+ Add Passenger</button>
       </form>
        </div>
      
        <button className="btn btn-info " onClick={handleClick}>Confirm booking
  </button>

          </div>
         </div>
         </div>
    )

}
export default TicketComponent;
/*      <div className="row">
    <div className="col-md-5">
        <p className="float-left"><strong>First Name</strong></p>
        <input type="text" id="firstName" className="form-control" required onChange={e=>setFirstName(e.target.value)}/>
    
    </div>
    <div className="col-md-2"></div>
   
    <div className="col-md-5">
        <p className="float-left"><strong>Last Name</strong></p>
        <input type="text" id="lastName" className="form-control" required onChange={e=>setLastName(e.target.value)}/>
    </div>
    
  </div>
        <div className='row'>
    <div className='col-md-5'>
      <p className='float-left' ><strong>Age</strong></p>
      <input type="number"  className='form-control' id='age' required onChange={e=>setAge(e.target.value)}/>
    </div>
    <div className='col-md-2'></div>
    <div className='col-md-5'>
      <p className='float-left'><strong>Gender</strong></p>
      <select id="gender" className="form-control" onChange={e=>setGender(e.target.value)}>
        <option >Choose...</option>
        <option>Male</option>
        <option>Female</option>
        <option>Prefer not to say</option>
      </select>
    </div>

  </div>

  <div className="row">
    <div className="col-md-5">
        <p className="float-left"><strong>Passenger Email Id</strong></p>
        <input type="email" required id="email" className="form-control" onChange={e=>setEmail(e.target.value)}/>
    </div>
    <div className="col-md-2"></div>
    <div className="col-md-5">
        <p className="float-left"><strong>Phone Number</strong></p>
        <input type="text"  required id="phonenumber" className="form-control" onChange={e=>setPhoneNumber(e.target.value)}/>
    </div>
  </div>*/
