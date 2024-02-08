import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileUpload,
  faFileCirclePlus,
  faFolderPlus,
} from "@fortawesome/free-solid-svg-icons";
import "./SubBar.css";

const SubBar = () => {
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
          <button className="btn btn-outline-dark">
            <FontAwesomeIcon icon={faFolderPlus} /> &nbsp;Create Folders
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default SubBar;
