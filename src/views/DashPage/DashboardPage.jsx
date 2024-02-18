import { React, useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useNavigate, Route, Routes, useLocation } from "react-router-dom";
import Nav from "../../components/DashboardComp/Navbar/Nav";
import SubBar from "../../components/DashboardComp/SubBar/SubBar";
import HomePageComp from "../../components/DashboardComp/HomePageComp/HomePageComp";
import CreateFolder from "../../components/DashboardComp/CreateFolder/CreateFolder";
import {
  getFiles,
  getFolders,
} from "../../redux/actionCreators/elementsActionCreator";
import FolderComp from "../../components/DashboardComp/FolderComp/FolderComp";
import CreateFile from "../../components/DashboardComp/CreateFile/CreateFile";
import FileComp from "../../components/DashboardComp/FileComp/FileComp";
import UploadFile from "../../components/DashboardComp/UploadFile/UploadFile";

const DashboardPage = () => {
  const [isCreateFolderModalOpen, setIsCreateFolderModalOpen] = useState(false);
  const [isCreateFileModalOpen, setIsCreateFileModalOpen] = useState(false);
  const [isFileUploadModalOpen, setIsFileUploadModalOpen] = useState(false);

  const [showSubBar, setShowBar] = useState(true);
  const { pathname } = useLocation();

  const { isLoggedIn, isLoading, userId } = useSelector(
    (state) => ({
      isLoggedIn: state.auth.isAuthenticated,
      isLoading: state.elements.isLoading,
      userId: state.auth.user.uid,
    }),
    shallowEqual
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (isLoading && userId) {
      dispatch(getFolders(userId));
      dispatch(getFiles(userId));
    }
  }, [isLoading, userId, dispatch]);

  useEffect(() => {
    if (pathname.includes("/file/")) {
      console.log("pathname", pathname);
      setShowBar(false);
    }
    console.log("works");
  }, [pathname]);

  return (
    <>
      {isCreateFolderModalOpen && (
        <CreateFolder setIsCreateFolderModalOpen={setIsCreateFolderModalOpen} />
      )}

      {isCreateFileModalOpen && (
        <CreateFile setIsCreateFileModalOpen={setIsCreateFileModalOpen} />
      )}
      {isFileUploadModalOpen && (
        <UploadFile setIsFileUploadModalOpen={setIsFileUploadModalOpen} />
      )}
      <Nav />
      {showSubBar && (
        <SubBar
          setIsCreateFolderModalOpen={setIsCreateFolderModalOpen}
          setIsCreateFileModalOpen={setIsCreateFileModalOpen}
          setIsFileUploadModalOpen={setIsFileUploadModalOpen}
        />
      )}

      <Routes>
        <Route path="" element={<HomePageComp />} />
        <Route path="folder/:folderId" element={<FolderComp />} />
        <Route path="file/:fileId" element={<FileComp />} />
      </Routes>
    </>
  );
};

export default DashboardPage;
