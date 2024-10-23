import {useState} from 'react';
import { useNavigate } from 'react-router-dom';

let PassengerComponent=()=>{
 const [firstName, setFirstName] = useState('');
 const [lastName,setLastName] = useState('');
 //const [age, setAge] = useState('');
 const [gender,setGender] = useState('');
 const [email,setEmail] = useState('');
 const [phonenumber,setPhoneNumber] = useState('');
 const navigate = useNavigate();
 
const [passengers, setPassengers] = useState([]);
const [name, setName] = useState('');
const [age, setAge] = useState('');   const handleSubmit = (e) => {
e.preventDefault();
setPassengers([...passengers, { name, age }]);
setName('');
setAge('');
    
 };
console.log(passengers);
return (<form onSubmit={handleSubmit}><input
type="text"
placeholder="Name"
value={name}
onChange={(e) => setName(e.target.value)}
/><input
type="number"
placeholder="Age"
value={age}
 onChange={(e) => setAge(e.target.value)}
/><button type="submit">Add Passenger</button><ul>
{passengers.map((passenger, index) => (<li key={index}>
Name: {passenger.name}, Age: {passenger.age}</li>
))}</ul></form>
);
};

export default PassengerComponent;
/*<div >
       
       
<div className="card text-center ">
<div className="card-header bg-secondary">
<h3 className="text-light ">  BrownField Airline Booking  </h3>
</div>
<div className="card-body ">
<form>


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
    <input type="number"  required id="phonenumber" className="form-control" onChange={e=>setPhoneNumber(e.target.value)}/>
</div>
</div>



<div>
    <br></br>
    <br></br>
<button className="btn btn-info " onClick={handleClick}>Add Passenger
</button>
</div>


</form>

</div>

<div className="card-footer bg-secondary">

</div>
</div>

</div>*/
