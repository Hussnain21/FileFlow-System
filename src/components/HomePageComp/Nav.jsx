import React from "react";
import { Link } from "react-router-dom";

const NavComponent = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand ms-5" to="/"> FileFLow System</Link>

        <ul className="navbar-nav ms-auto me-5">
           <li className="nav-item mx-2">
            <Link className="btn btn-primary btn-sm" to="/login">
                Login
            </Link>
           </li>

           <li className="nav-item">
            <Link className="btn btn-success btn-sm" to="/register">
                Register here
            </Link>
           </li>
        </ul>
        </nav>
    );
};

export default NavComponent;