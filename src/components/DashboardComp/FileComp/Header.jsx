import { faAngleLeft, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateFileData } from "../../../redux/actionCreators/elementsActionCreator";

const Header = ({ fileName, fileId, fileData, prevFileData }) => {
  const navigate = useNavigate();
  const disptach = useDispatch();

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
    const bit = document.createElement("a");
    bit.setAttribute("href", openedFile.data.data);
    bit.setAttribute("download", openedFile.data.name);
    bit.setAttribute("target", "_blank");
    bit.style.display = "none";
    document.body.appendChild(bit);
    bit.click();
    document.body.removeChild(bit);

    console.log(bit);
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
              disptach(updateFileData(fileId, fileData));
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
      </ul>
    </nav>
  );
};

export default Header;
