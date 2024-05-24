import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Success = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { personData } = location.state;

  return (
    <div className="success-container">
      <h2>Form Submission Successful!</h2>
      <ul>
        {Object.entries(personData).map(([key, value]) => (
          <li key={key}>
            <strong>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</strong> {value}
          </li>
        ))}
      </ul>
      <button onClick={() => navigate("/")} className="go-back">Go Back</button>
    </div>
  );
};

export default Success;
