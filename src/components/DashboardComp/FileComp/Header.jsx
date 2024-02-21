import { faAngleLeft, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  updateFileData,
  deleteFile,
} from "../../../redux/actionCreators/elementsActionCreator";

const Header = ({ fileName, fileId, fileData, prevFileData }) => {
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

  const downloadFile = () => {
    // Create a Blob object with the file data
    const fileDataBlob = new Blob([openedFile.data.data], {
      type: "application/octet-stream",
    });

    // Create a download link
    const downloadLink = document.createElement("a");
    downloadLink.href = window.URL.createObjectURL(fileDataBlob);
    downloadLink.download = openedFile.data.name;

    // Append the link to the body, trigger the click event, and remove the link
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const handleDelete = () => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this file?"
    );
    if (shouldDelete) {
      dispatch(deleteFile(fileId));
    }
  };

  return (
    <nav className="navbar navbar-expand-lg mt-2 navbar-light bg-white shadow-sm">
      <p className="navba-brand my-0 fw-bold ms-5 ">{fileName}</p>
      {fileData !== prevFileData && (
        <h5 className="my-o fw-bold ms-2 text-primary">*[modified]</h5>
      )}

      <ul className="navbar-nav ms-auto me-5">
        <li className="nav-item mx-2">
          <button
            className="btn btn-dark"
            disabled={fileData === prevFileData}
            onClick={() => {
              dispatch(updateFileData(fileId, fileData));
            }}
          >
            <FontAwesomeIcon icon={faSave} /> Save
          </button>
        </li>
        <li className="nav-item mx-2">
          <button className="btn btn-dark" onClick={() => navigate("/")}>
            <FontAwesomeIcon icon={faAngleLeft} /> Go Back
          </button>
        </li>
        <li className="nav-item mx-2">
          <button className="btn btn-dark" onClick={() => downloadFile()}>
            <FontAwesomeIcon icon={faAngleLeft} /> Download
          </button>
        </li>
        <li className="nav-item mx-2">
          <button className="btn btn-dark" onClick={handleDelete}>
            <FontAwesomeIcon icon={faAngleLeft} /> Delete
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
