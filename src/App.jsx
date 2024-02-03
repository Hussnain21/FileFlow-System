import { Route, Routes } from "react-router-dom";

import './App.css'

import { HomePage, Login, Register, DashboardPage } from "./views";

const App = () => {

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
