import React from "react";
import { Link } from "react-router-dom";
import { NavComponent } from "../../../components/HomePageComp";

import LoginForm from "../../../components/AuthComp/LoginForm";

const Login = () => {
  return (
    <>
      <NavComponent />
      <div className="conatiner-fluid">
        <h1 className="display-1 my-5 text-center">Login here</h1>
        <div className="row">
          <div className="col-md-5 mx-auto mt-5">
            <LoginForm />
            <Link to="/register" className="ms-auto">
              Not a member? Register
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
