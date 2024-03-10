import Header from "./Header";

import { useNavigate, useParams } from "react-router-dom";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import FileEditor from "./FileEditor";
import { useState, useEffect } from "react";
import "./file.css";
import {
  updateFileData,
  deleteFile,
} from "../../../redux/actionCreators/elementsActionCreator";

const FileComp = () => {
  const { fileId } = useParams();
  const [fileData, setFileData] = useState("");
  const [prevFileData, setPrevFileData] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { openedFile, isAuthenticated } = useSelector(
    (state) => ({
      openedFile: state.elements.userFiles.find(
        (file) => file.docId === fileId
      ),
      isAuthenticated: state.auth.isAuthenticated,
    }),
    shallowEqual
  );

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  });

  useEffect(() => {
    if (openedFile) {
      setFileData(openedFile?.data?.data);
      setPrevFileData(openedFile?.data?.data);
    }
  }, [openedFile, openedFile?.data?.data]);

  const downloadFile = () => {
    const bit = document.createElement("a");
    bit.setAttribute("href", openedFile.data.url);
    bit.setAttribute("download", openedFile.data.name);
    bit.setAttribute("target", "_blank");
    bit.style.display = "none";
    document.body.appendChild(bit);
    bit.click();
    document.body.removeChild(bit);

    console.log(bit);
  };

  const handleDelete = () => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this file?"
    );
    if (shouldDelete) {
      dispatch(deleteFile(fileId));
      navigate("/dashboard");
    }
  };

  if (isAuthenticated)
    return (
      <div>
        {isAuthenticated && fileData !== null ? (
          <>
            <Header
              fileName={openedFile?.data?.name}
              fileData={fileData}
              prevFileData={prevFileData}
              fileId={fileId}
            />
            <FileEditor
              fileName={openedFile?.data?.name}
              data={fileData}
              setData={setFileData}
            />
          </>
        ) : (
          <div className="position-fixed left-0 top-0 w-100 h-100 bg-black text-white">
            <div className="d-flex py-4 px-5 mt-4 justify-content-between align-items-center">
              <p title={openedFile?.data?.name} className="my-0">
                {openedFile?.data?.name.length > 40
                  ? openedFile?.data?.name.slice(0, 40) +
                    "... ." +
                    openedFile?.data?.extension
                  : openedFile?.data?.name}
              </p>
              <div className="d-flex align-items-center text-white me-5">
                <button
                  className="btn btn-sm btn-outline-light me-2"
                  onClick={() => navigate(-1)}
                >
                  {" "}
                  Go back
                </button>
                <button
                  className="btn btn-sm btn-primary me-2"
                  onClick={() => downloadFile()}
                >
                  Download
                </button>
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => handleDelete()}
                >
                  Delete
                </button>
              </div>
            </div>
            <div
              className="d-flex align-item-center justify-content-center"
              style={{ height: "650px", overflow: " auto" }}
            >
              {openedFile?.data?.extension.includes("png") ||
              openedFile?.data?.extension.includes("jpg") ||
              openedFile?.data?.extension.includes("jpeg") ||
              openedFile?.data?.extension.includes("JPG") ||
              openedFile?.data?.extension.includes("gif") ? (
                <img
                  src={openedFile?.data?.url}
                  alt={openedFile?.data?.name}
                  className="responsive-img"
                />
              ) : (
                <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                  <p className="text-center">
                    File type not supported. Please download the file to view
                    it.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  return <div>Login first</div>;
};

export default FileComp;
