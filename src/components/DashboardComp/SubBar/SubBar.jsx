import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileUpload,
  faFileCirclePlus,
  faFolderPlus,
  faSquareCaretUp,
} from "@fortawesome/free-solid-svg-icons";
import "./SubBar.css";

const SubBar = ({ setIsCreateFolderModalOpen }) => {
  return (
    <nav className="navbar navbar-expand-lg mt-2 navbar-light bg-white py-2 px-5">
      <p className="small ms-3 "> Root </p>

      <ul className="navbar-nav ms-auto">
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
        <li className="nav-item mx-2">
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
