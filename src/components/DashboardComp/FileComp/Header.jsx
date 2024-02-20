import { faAngleLeft, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateFileData } from "../../../redux/actionCreators/elementsActionCreator";

const Header = ({ fileName, fileId, fileData, prevFileData }) => {
  const navigate = useNavigate();
  const disptach = useDispatch();
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
      </ul>
    </nav>
  );
};

export default Header;
