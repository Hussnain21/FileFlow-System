import React from 'react'
import { Link } from "react-router-dom";
import {NavComponent} from "../../../components/HomePageComp";

import RegisterForm from "../../../components/AuthComp/RegisterForm";

const Register = () => {
    return (
        <>
        <NavComponent/>
        <div className="conatiner-fluid">
            <h1 className="display-1 my-5 text-center">Register here</h1>
            <div className="row">
                <div className="col-md-5 mx-auto mt-5">
                    <RegisterForm />
                    <Link to="/login" className="ms-auto">
                        Already a member? Login
                    </Link>
                </div>
            </div>
        </div>
        </>
    )
}

export default Register;