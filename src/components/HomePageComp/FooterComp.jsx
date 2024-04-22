import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Footer = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const footerStyle = {
    background: "#333",
    color: "#fff",
    padding: "20px 0",
    textAlign: "center",
  };

  const additionalInfoStyle = {
    fontSize: "14px",
    marginTop: "10px",
  };

  return (
    <footer className="footer" style={footerStyle}>
      <div className="content">
        <p>
          FileFlow System ©{" "}
          {new Date().toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>
      <div className="content" style={additionalInfoStyle}>
        <p>
          To access the FileFlow System click below:
          <br />
          {isAuthenticated ? (
            <Link
              className="btn1 btn-sm"
              to="/dashboard"
              style={{ textDecoration: "underline", color: "#206efd" }}
            >
              Dashboard
            </Link>
          ) : (
            <>
              <a href="/login">Login</a> | <a href="/register">Register</a>
            </>
          )}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
