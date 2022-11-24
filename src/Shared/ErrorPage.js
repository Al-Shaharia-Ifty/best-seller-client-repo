import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div>
      <h2>ErrorPage</h2>
      <Link to={"/"}>
        <button className="btn btn-primary">Go to Home Page</button>
      </Link>
    </div>
  );
};

export default ErrorPage;
