import {useEffect,useRef,useState} from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import authHeader from '../services/auth-header';
let PaymentComponent = ()=>{
    const [searchparams] = useSearchParams();
    console.log(searchparams.get("Fid"));
    const id = parseInt(searchparams.get("Fid"));
    const[records,setBooking]=useState([])
    useEffect(()=>{
      fetch(`http://localhost:8082/api/booking/tickets/${id}`,{ headers: authHeader() })
      .then(res=>res.json())
      .then((result)=>{
        setBooking(result);
      })
    },[id]);
 console.log(records)
const navigate = useNavigate();
const val = parseFloat(records.price);
console.log(val)

  const paypal = useRef();
    useEffect(() => {
      if(window.myButton) window.myButton.close();
        window.myButton = window.paypal
          .Buttons({
            createOrder: (data, actions, err) => {
              return actions.order.create({
                intent: "CAPTURE",
                purchase_units: [
                  {
                    description: "Flight Booking",
                    amount: {
                      currency_code: "USD",
                      value: val,
                    },
                  },
                ],
              });
            },
            onApprove: async (data, actions) => {
              const order = await actions.order.capture();
              alert("payment successful");
              navigate("/booking");
              console.log(order);
              
            },
            onError: (err) => {
              console.log(err);
            },
          })
          window.myButton.render(paypal.current);
         
      }, [val]);
    
    return (
        <div className='container p-5 my-5'>
            
        <div className="card text-center ">
<div className="card-header bg-secondary"  ref={paypal}>
 
</div>

    </div>
    </div>
    )
}
export default PaymentComponent;