import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileUpload,
  faFileCirclePlus,
  faFolderPlus,
  faSquareCaretUp,
} from "@fortawesome/free-solid-svg-icons";
import "./SubBar.css";
import { Link } from "react-router-dom";

const SubBar = ({ setIsCreateFolderModalOpen }) => {
  return (
    <nav className="navbar navbar-expand-lg mt-2 navbar-light bg-white py-2">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item ms-5">
            <Link to="/dashboard">Root</Link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            New Folder
          </li>
        </ol>
      </nav>

      <ul className="navbar-nav ms-auto me-5">
        <li className="nav-item mx-2">
          <button className="btn btn-outline-dark ">
            <FontAwesomeIcon icon={faFileUpload} /> &nbsp;Upload Files
          </button>
        </li>
        <li className="nav-item mx-2">
          <button className="btn btn-outline-dark">
            <FontAwesomeIcon icon={faFileCirclePlus} /> &nbsp;Create Files
          </button>
        </li>
        <li className="nav-item ms-2">
          <button
            className="btn btn-outline-dark"
            onClick={() => setIsCreateFolderModalOpen(true)}
          >
            <FontAwesomeIcon icon={faFolderPlus} /> &nbsp;Create Folder
          </button>
        </li>
        <li className="nav-item mx-2">
          <button className="btn btn-outline-dark">
            <FontAwesomeIcon icon={faSquareCaretUp} /> &nbsp;Upload Images
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default SubBar;
