
import {Link} from 'react-router-dom'
import AuthService from "../services/auth.service";
import React, { useState, useEffect } from "react";
import EventBus from "../common/EventBus"
let NavigationComponent = () =>{

    const [showModeratorBoard, setShowModeratorBoard] = useState(false);
    const [showAdminBoard, setShowAdminBoard] = useState(false);
    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
      const user = AuthService.getCurrentUser();

      if (user) {
        setCurrentUser(user);
        setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
        setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
      }

      EventBus.on("logout", () => {
        logOut();
      });

      return () => {
        EventBus.remove("logout");
      };
    }, []);

    const logOut = () => {
      AuthService.logout();
      setShowModeratorBoard(false);
      setShowAdminBoard(false);
      setCurrentUser(undefined);
    };

    return (
        <div>
        <nav className="navbar navbar-expand navbar-dark bg-info">
          <Link to={"/"} className="navbar-brand">
            Brownfield
          </Link>
          <div className="navbar-nav mr-auto">
           
            {showModeratorBoard && (
              <li className="nav-item">
                <Link to={"/mod"} className="nav-link">
                  Moderator Board
                </Link>
              </li>
            )}

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
            )}

            {currentUser && (
              <li className="nav-item">
                <Link to={"/user"} className="nav-link">
                  User
                </Link>
              </li>
            )}
          </div>

          {currentUser ? (
            <div className="collapse navbar-collapse justify-content-end">
            <ul  className="nav navbar-nav">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={logOut}>
                  LogOut
                </a>
              </li>
              </ul>
            </div>
          ) : (
            <div className="collapse navbar-collapse justify-content-end">
            <ul className="nav navbar-nav pull-right">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
              </ul>
            </div>
          )}
        </nav>
    </div>
    )
}

export default NavigationComponent;
