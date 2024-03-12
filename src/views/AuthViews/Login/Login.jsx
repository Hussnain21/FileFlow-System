import React from "react";
import { Link } from "react-router-dom";
import { NavComponent } from "../../../components/HomePageComp";

import LoginForm from "../../../components/AuthComp/LoginForm";
import Footer from "../../../components/HomePageComp/FooterComp";

const Login = () => {
  return (
    <>
      <NavComponent />
      <div className="conatiner-fluid">
        <h1 className="display-1 my-5 text-center" style={{ color: "black" }}>
          Login here
        </h1>
        <div className="row">
          <div className="col-md-5 mx-auto mt-5">
            <LoginForm />
          </div>
        </div>
      </div>
      <div
        className="footer"
        style={{
          marginTop: "220px",
          borderTop: "1px solid #ccc",
          textAlign: "center",
        }}
      >
        <Footer />
      </div>
    </>
  );
};

export default Login;
