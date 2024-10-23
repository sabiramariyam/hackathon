import {useNavigate,createSearchParams} from 'react-router-dom'
import {useEffect,useState} from 'react';
import axios from 'axios'
import authHeader from '../services/auth-header';


let BookHistoryComponent =()=>{

    const navigate = useNavigate();
    //const currentUser = AuthService.getCurrentUser();
    const[records,setBooking]=useState([]);
 
    useEffect(()=>{
      //console.log(currentUser.username);
      //fetch(`http://localhost:8082/api/booking/tickets/${currentUser.username}`)
      fetch(`http://localhost:8082/api/booking/tickets`,{ headers: authHeader() })
      .then(res=>res.json())
      .then((result)=>{
        setBooking(result);
      }
    )
    },[])
    const [disable1, setDisablePay] = useState(false);
    const [disable2, setDisableCheck] = useState(false);

   /* const [flight,setFlight]=useState('')
    useEffect(()=>{
      fetch(`http://localhost:8082/api/flight/${flightId}`,{headers: authHeader()})
      .then(res=>res.json())
      .then((result)=>{
        setFlight(result);
      })
    })*/
  
 const cancelbook=(e,id)=>{
  console.log(id);
    console.log(records);
     axios.delete(`http://localhost:8082/api/booking/cancelBooking/${id}`,{ headers: authHeader() })  
       .then(res => {  
         console.log(res);  
         console.log(res.data);  
         setBooking(records.filter(item => item.id !== id));  
         window.location.reload();
       })  
      
   } 

   const paymentbooking=(e,id) =>{
    navigate({
      pathname: '/payment',
      search: createSearchParams({
          Fid: id
      }).toString()
  });

 
   }

   const disableCheckin = ()=>{
       disable1 = true;
   }

   const  ticketcheckin=(e,id)=>{
   
        console.log("The id for checkin:" + id);
        axios.post(`http://localhost:8082/api/checkin/checkin/${id}`,{ headers: authHeader() })
        .then((res) =>{
            alert("Checked in successfully");
            disableCheckin();
        },
        (error) => {
          const _content =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
            alert("CheckIn Time Outdated or Check-in is not enable before 24 hrs");
           
        })
       
    
    
   }
 
   const moveButtonClick=() =>{
     navigate('/flightsearchuser', { replace: true })
     
   }
   const backButtonClick=() =>{
     navigate('/user', { replace: true })
     
   }


  
    return(
        <div className="container p-5 my-auto">
        <button className="float-start btn btn-info" onClick={backButtonClick} >Home Page</button>
      
      <button className="float-end btn btn-info" onClick={moveButtonClick} >New ticket booking</button>
      
       <div className="card" >
<div className="card-body">
<table className="table table-hover mx-auto">
   
   <thead>
       <tr>
           <th>Ticket Number</th>
           <th>Price</th>
           <th>Seats Booked</th>
           <th>seat Class</th>
           <th>Reservation Date</th>
           
           

       </tr>
   </thead>
   <tbody>
       {records.map((item,index)=>
               <tr key={item.id}>
                 <td>{item.ticketNumber}</td>
                   <td>{item.price}</td>
                   <td>{item.count}</td>
                   <td>{item.seatClass}</td>
                   <td>{item.reservationDate}</td>
                   <td>{item.flightid}</td>
                   <td><button className="btn btn-secondary"  onClick={(e)=>paymentbooking(e,item.id)}>Payment</button></td>
                   <td><button type="button" id="checkin" className="btn btn-secondary " disabled={disable1} onClick={(e)=>ticketcheckin(e,item.id)}>Check in</button></td>
                   <td><button className="btn btn-secondary" onClick={(e)=>cancelbook(e,item.id)}>Cancel Booking</button></td>
                  
               </tr>
       )}
   </tbody>
</table>

</div>
</div>

   </div>
    )
}
export default BookHistoryComponent;
