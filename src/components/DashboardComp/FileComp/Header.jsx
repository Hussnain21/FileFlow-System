import { faAngleLeft, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

const Header = ({ fileName }) => {
  const navigate = useNavigate();
  return (
    <nav className="navbar navbar-expand-lg mt-1 navbar-light bg-white shadow-sm">
      <p className="navba-brand my-0 fw-bold ms-5 ">{fileName}</p>

      <ul className="navbar-nav ms-auto me-5">
        <li className="nav-item mx-2">
          <button className="btn btn-dark" disabled={true}>
            <FontAwesomeIcon icon={faSave} /> Save
          </button>
        </li>
        <li className="nav-item mx-2">
          <button className="btn btn-dark" onClick={() => navigate(-1)}>
            <FontAwesomeIcon icon={faAngleLeft} /> Go Back
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
