import React from "react";
import { NavComponent } from "../../components/HomePageComp";
import "./Home.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Footer from "../../components/HomePageComp/FooterComp";
import MainBody from "../../components/HomePageComp/MainBodyComp/MainBody";

const HomePage = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  let heading = "Manage your files safely";
  let subheading =
    "Our user-friendly interface makes it easy to upload, organize, and search for files. No more digging through cluttered folders";

  return (
    <>
      <NavComponent />
      <div className="mine">
        <section className="hero">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">{heading}</h1>
              <div className="is-two-thirds column is-paddingless">
                <h2 className="subtitle is-4"> {subheading}</h2>
              </div>
              {isAuthenticated ? (
                <Link
                  className="btn1 btn-dark btn-sm"
                  id="learn"
                  to="/dashboard"
                >
                  Dashboard
                </Link>
              ) : (
                <Link className="btn1 btn-dark btn-sm" id="learn" to="/login">
                  Get Started
                </Link>
              )}
            </div>
          </div>
        </section>
      </div>
      <MainBody />
      <Footer />
    </>
  );
};

export default HomePage;
