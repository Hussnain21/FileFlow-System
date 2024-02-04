import { Route, Routes,  } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import './App.css'

import { HomePage, Login, Register, DashboardPage } from "./views";
import { checkIsLoggedIn } from "./redux/actionCreators/authActionCreator";

const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkIsLoggedIn());
  }, [])

  return (
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<DashboardPage />} />
         </Routes>
      </div>
  );
};

export default App;
