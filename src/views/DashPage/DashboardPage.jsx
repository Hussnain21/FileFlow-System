import { React, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Nav from "../../components/DashboardComp/Navbar/Nav";
import SubBar from "../../components/DashboardComp/SubBar/SubBar";
import HomePageComp from "../../components/DashboardComp/HomePageComp/HomePageComp";
import CreateFolder from "../../components/DashboardComp/CreateFolder/CreateFolder";

const DashboardPage = () => {
  const [isCreateFolderModalOpen, setIsCreateFolderModalOpen] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);

  return (
    <>
      {isCreateFolderModalOpen && (
        <CreateFolder setIsCreateFolderModalOpen={setIsCreateFolderModalOpen} />
      )}
      <Nav />
      <SubBar setIsCreateFolderModalOpen={setIsCreateFolderModalOpen} />
      <HomePageComp />
    </>
  );
};

export default DashboardPage;
