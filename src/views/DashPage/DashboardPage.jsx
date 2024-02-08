import { React, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Nav from "../../components/DashboardComp/Navbar/Nav";
import SubBar from "../../components/DashboardComp/SubBar/SubBar";
import HomePageComp from "../../components/DashboardComp/HomePageComp/HomePageComp";

const DashboardPage = () => {
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);

  return (
    <>
      <Nav />
      <SubBar />
      <HomePageComp />
    </>
  );
};

export default DashboardPage;
