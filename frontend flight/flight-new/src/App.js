
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";



import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
import BoardModerator from "./components/BoardModerator";
import BoardAdmin from "./components/BoardAdmin";

import NavigationComponent from "./components/Navigation";
import SearchComponent from "./components/Search";
import AddFlightComponent from "./components/AddFlight";
import FareComponent from "./components/Fare";
import BookHistoryComponent from "./components/bookhistory";
import UserSearchComponent from "./components/FlightSearchUser";
import UserViewComponent from "./components/FlightUserView";
import TicketComponent from "./components/Ticket";
import PageNotComponent from "./components/NotFound";
import EditFlightComponent from "./components/EditFlight";
import PaymentComponent from "./components/Payment";
import PassengerComponent from "./components/Passenger";


const App = () => {
 
  return (
    <div className="App img-responsive ">
      <NavigationComponent/>

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/user" element={<BoardUser/>} />
          <Route path="/mod" element={<BoardModerator/>} />
          <Route path="/admin" element={<BoardAdmin/>} />
          <Route path='/search' element={<SearchComponent/>}/>
          <Route path='/addflight' element={<AddFlightComponent/>}/>
          <Route path='/farepage' element={<FareComponent/>}/>
          <Route path='/booking' element={<BookHistoryComponent/>}/>
          <Route path='/flightsearchuser' element={<UserSearchComponent/>}/>
          <Route path='/editflight' element={<EditFlightComponent/>}/>
          <Route path="/payment" element={<PaymentComponent/>}/>
          <Route path='/ticket' element={<TicketComponent/>}/>
          <Route path='/passenger' element={<PassengerComponent/>}/>
          <Route path='*' element={<PageNotComponent/>}/>
        </Routes>
      </div>

    </div>
  );
};

export default App;
