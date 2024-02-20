import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { SignOutUser } from "../../../redux/actionCreators/authActionCreator";

const Nav = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm p-3">
      <Link className="navbar-brand ms-5" to="/dashboard">
        FileFLow System
      </Link>

      <ul className="navbar-nav ms-auto me-5">
        {isAuthenticated ? (
          <>
            <li className="nav-item mx-2">
              <p className="my-0 mt-2 mx-2">
                <span className="text-dark"> Welcome: </span>
                <span className="fw-bold">{user.displayName}</span>
              </p>
            </li>
            <li className="nav-item mx-2">
              <Link className="btn btn-dark" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <button
                className="btn btn-dark"
                onClick={() => dispatch(SignOutUser())}
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li className="nav-item mx-2">
              <Link className="btn btn-dark btn-sm" to="/login">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link className="btn btn-dark btn-sm" to="/register">
                Register here
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
