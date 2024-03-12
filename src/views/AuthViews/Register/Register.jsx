import React from "react";
import { Link } from "react-router-dom";
import { NavComponent } from "../../../components/HomePageComp";

import RegisterForm from "../../../components/AuthComp/RegisterForm";
import Footer from "../../../components/HomePageComp/FooterComp";

const Register = () => {
  return (
    <>
      <NavComponent />
      <div className="conatiner-fluid">
        <h1 className="display-1 my-5 text-center">Register here</h1>
        <div className="row">
          <div className="col-md-5 mx-auto mt-5">
            <RegisterForm />
          </div>
        </div>
      </div>
      <div
        className="footer"
        style={{
          marginTop: "165px",
          borderTop: "1px solid #ccc",
          textAlign: "center",
        }}
      >
        <Footer />
      </div>
    </>
  );
};

export default Register;
