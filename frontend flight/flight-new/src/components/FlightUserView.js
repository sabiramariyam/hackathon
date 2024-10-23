import {createSearchParams, useNavigate} from 'react-router-dom'

let UserViewComponent=(props)=>{
    let records = props.data
    console.log(records)
    let navigate = useNavigate();
     
    

    let handleClick=(e,id)=>{
        console.log("id comes from userView",id);
        navigate({
            pathname: '/ticket',
            search: createSearchParams({
                Fid: id
            }).toString()
        });

    }
    return(
        <div>
            <div className="container p-5 my-5">
           <div class="card" >
 <div class="card-body">
   <table className="table table hover mx-3">
       
       <thead>
           <tr>
               <th>Flight Id</th>
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
           </tr>
       </thead>
       <tbody>
           {records.map((item,index)=>
                   <tr key={item.flightId}>
                     <td>{item.flightId}</td>
                       <td>{item.arrivalTime}</td>
                       <td>{item.departureTime}</td>
                       <td>{item.origin}</td>
                       <td>{item.destination}</td>
                       <td>{item.flightTravelDate}</td>
                       <td>{item.remainingBusinessSeats}</td>
                       <td>{item.remainingEconomySeats}</td>
                       <td>{item.remainingPremiumSeats}</td>
                       <td><button class="btn btn-secondary" onClick={(e)=>handleClick(e,item.flightId)}>Book</button></td>
                   </tr>
           )}
       </tbody>
   </table>
 </div>
</div>
</div>
        </div>
    )
}
export default UserViewComponent;

