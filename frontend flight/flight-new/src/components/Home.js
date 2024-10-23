import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";

const Home = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  return (
    <div className="container p-5 my-5">
      <div className="card ">
      <header className="jumbotron justify-content-center">
        <h3>{content}</h3>
        <h2>Welcome to Brownfield Airlines</h2>

      </header>
      </div>
    </div>
  );
};

export default Home;
