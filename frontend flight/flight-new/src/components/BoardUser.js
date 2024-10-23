import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import {useNavigate} from 'react-router-dom'
const BoardUser = () => {
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    UserService.getUserBoard().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }, []);

  const bookhistory=()=>{
    navigate('/booking', {replace: true});
  }

  const newBook =() =>{
    navigate('/flightsearchuser',{replace:true});
  }

  return (
    <div className="container p-5 my-5">
      <div className="card text-center">
      <div className="card-header bg-secondary">
        <h3 className="text-light ">  BrownField Airline Booking  </h3>
      </div>
      <div className="card-body">
        <h2 >{content}</h2>
        <br></br>
        <br></br>
        <div className="row">
        <div className="col-md-8">
        <h5>View the Booking History</h5></div>
        <div className="col-md-4">
        <button className="btn btn-info" onClick={bookhistory}>Booking History</button>
        </div>
        <br></br>
        <br></br>
        <br></br>
        </div>
        <div className="row">
        <div className="col-md-8">
        <h5>Book a Ticket</h5></div>
        <div className="col-md-4">
        <button className="btn btn-info" onClick={newBook}>New Booking</button>
        </div>
        </div>
        </div>
         <div className="card-footer bg-secondary">
   
  </div>
        </div>
    </div>
  );
};

export default BoardUser;
