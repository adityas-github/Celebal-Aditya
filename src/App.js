import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FormComponent from "./Components/FormComponent";
import SuccessPage from "./Components/SuccessPage"; // Create this component to display success message

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FormComponent />} />
        <Route path="/success" element={<SuccessPage />} />
      </Routes>
    </Router>
  );
};

export default App;
