import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Importing icons from react-icons
import "./FormComponent.css"; // Import the CSS file

const FormComponent = () => {
  const [personData, setPersonData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    phoneNo: "",
    country: "",
    city: "",
    panNo: "",
    aadharNo: "",
  });

  const [errors, setErrors] = useState({});
  const [currentStep, setCurrentStep] = useState(1);
  const [isNextEnabled, setIsNextEnabled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const regexValidators = {
    firstName: {
      regex: /^[a-zA-Z]{2,}$/,
      message: "First name should contain at least 2 alphabetic characters."
    },
    lastName: {
      regex: /^[a-zA-Z]{2,}$/,
      message: "Last name should contain at least 2 alphabetic characters."
    },
    userName: {
      regex: /^[a-zA-Z0-9]{3,}$/,
      message: "Username should contain at least 3 alphanumeric characters."
    },
    email: {
      regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      message: "Email is not valid."
    },
    password: {
      regex: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      message: "Password should be at least 8 characters long and contain at least one letter and one number."
    },
    phoneNo: {
      regex: /^\d{10}$/,
      message: "Phone number should be 10 digits long."
    },
    panNo: {
      regex: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
      message: "PAN number should be in the format AAAAA1234A."
    },
    aadharNo: {
      regex: /^\d{12}$/,
      message: "Aadhar number should be 12 digits long."
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPersonData({ ...personData, [name]: value });

    // Validate fields on change
    const isValid = regexValidators[name] ? regexValidators[name].regex.test(value) : value.length > 0;
    setErrors({ ...errors, [name]: isValid ? "" : regexValidators[name]?.message });

    // Check if all fields in the current step are filled and valid
    const stepFields = getStepFields(currentStep);
    const allFieldsFilled = stepFields.every(field => personData[field] && (regexValidators[field] ? regexValidators[field].regex.test(personData[field]) : true));
    setIsNextEnabled(allFieldsFilled);
  };

  const getStepFields = (step) => {
    return step === 1 
      ? ["firstName", "lastName", "userName", "email", "password"] 
      : ["phoneNo", "panNo", "aadharNo", "country", "city"];
  };

  const isStepComplete = (step) => {
    const stepFields = getStepFields(step);
    return stepFields.every(field => personData[field] && (regexValidators[field] ? regexValidators[field].regex.test(personData[field]) : true));
  };

  const nextStep = () => {
    if (isStepComplete(currentStep)) {
      setCurrentStep((prevStep) => prevStep + 1);
      setIsNextEnabled(false); // Disable next button for the new step
    } else {
      const stepFields = getStepFields(currentStep);
      const newErrors = {};
      stepFields.forEach(field => {
        if (!personData[field] || (regexValidators[field] && !regexValidators[field].regex.test(personData[field]))) {
          newErrors[field] = regexValidators[field]?.message || "This field is required.";
        }
      });
      setErrors(newErrors);
    }
  };

  const prevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
    setIsNextEnabled(true); // Enable next button when going back to the previous step
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isStepComplete(currentStep)) {
      console.log(personData);
      navigate("/success", { state: { personData } });
    } else {
      const stepFields = getStepFields(currentStep);
      const newErrors = {};
      stepFields.forEach(field => {
        if (!personData[field] || (regexValidators[field] && !regexValidators[field].regex.test(personData[field]))) {
          newErrors[field] = regexValidators[field]?.message || "This field is required.";
        }
      });
      setErrors(newErrors);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleFormSubmit}>
        {currentStep === 1 && (
          <>
            {["firstName", "lastName", "userName", "email", "password"].map((field) => (
              <div key={field} className="form-group">
                <label className="form-label">
                  {field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:
                  <div className="password-input-container">
                    <input
                      type={field === "password" ? (showPassword ? "text" : "password") : field === "email" ? "email" : "text"}
                      name={field}
                      value={personData[field]}
                      onChange={handleChange}
                      required
                      className="form-input"
                    />
                    {field === "password" && (
                      <button type="button" onClick={togglePasswordVisibility} className="toggle-password">
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    )}
                  </div>
                  {errors[field] && <span className="error-message">{errors[field]}</span>}
                </label>
              </div>
            ))}
          </>
        )}

        {currentStep === 2 && (
          <>
            {["phoneNo", "panNo", "aadharNo"].map((field) => (
              <div key={field} className="form-group">
                <label className="form-label">
                  {field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:
                  <input
                    type="text"
                    name={field}
                    value={personData[field]}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                  {errors[field] && <span className="error-message">{errors[field]}</span>}
                </label>
              </div>
            ))}

            <div className="form-group">
              <label className="form-label">
                Country:
                <select
                  name="country"
                  value={personData.country}
                  onChange={handleChange}
                  required
                  className="form-select"
                >
                  <option value="">Select Country</option>
                  <option value="India">India</option>
                  <option value="USA">USA</option>
                  <option value="UK">UK</option>
                </select>
                {errors.country && <span className="error-message">This field is required</span>}
              </label>
            </div>
            
            <div className="form-group">
              <label className="form-label">
                City:
                <select
                  name="city"
                  value={personData.city}
                  onChange={handleChange}
                  required
                  className="form-select"
                >
                  <option value="">Select City</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Bangalore">Bangalore</option>
                </select>
                {errors.city && <span className="error-message">This field is required</span>}
              </label>
            </div>
          </>
        )}

        <div className="button-group">
          {currentStep !== 1 && (
            <button type="button" onClick={prevStep} className="form-button">
              Previous
            </button>
          )}
          {currentStep !== 2 && (
            <button type="button" onClick={nextStep} className="form-button" disabled={!isNextEnabled}>
              Next
            </button>
          )}
          {currentStep === 2 && (
            <button type="submit" className="form-button">
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default FormComponent;
