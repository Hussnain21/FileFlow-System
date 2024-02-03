import { Route, Routes } from "react-router-dom";

import './App.css'
import { HomePage } from './views/HomePage/HomePage';
import Login from "./views/AuthViews/Login/Login";
import Register from "./views/AuthViews/Register/Register";

const App = () => {

  return (
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
         </Routes>
      </div>
  );
};

export default App;
