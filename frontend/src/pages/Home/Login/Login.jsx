import React, { useState } from "react";
import "./Login.css";
import logo from "../../../assets/logo.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";



const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signState, setSignState] = useState("Sign In");
  const [error, setError] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const ChangeState = () => {
    signState === "Sign In" ? setSignState("Sign Up") : setSignState("Sign In");
  };
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Clear previous errors
    setError({ email: "", password: "" });
    
    let errorMessages = [];
    
    // Email validation
    if (!email.trim()) {
      errorMessages.push("Email is required");
    } else if (!emailRegex.test(email)) {
      errorMessages.push("Email must be valid (e.g., user@gmail.com)");
    }
    
    // Password validation
    if (!password.trim()) {
      errorMessages.push("Password is required");
    } else if (!passwordRegex.test(password)) {
      errorMessages.push("Password must be at least 8 characters with letters and numbers (e.g., netflix123)");
    }
    
    if (errorMessages.length > 0) {
      alert("Please fix the following errors:\n\n" + errorMessages.join("\n"));
      setLoading(false);
      return;
    }

    try {
      if (signState === "Sign Up") {
        if (!name.trim()) {
          alert("Name is required for registration");
          setLoading(false);
          return;
        }
        
        const response = await axios.post("http://localhost:5000/api/users/register", {
          name,
          email,
          password
        });
        
        alert("Registration successful!");
        setSignState("Sign In");
      } else {
        // Login logic
        const response = await axios.post("http://localhost:5000/api/users/login", {
          email,
          password
        });
        
        alert("Login successful!");
        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(response.data.user));
        navigate("/");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message;
      if (errorMessage === "User not found") {
        alert("No account found with this email. Please sign up first.");
      } else if (errorMessage === "Invalid password") {
        alert("Incorrect password. Please try again.");
      } else {
        alert(errorMessage || "Something went wrong");
      }
    }
    
    setLoading(false);
  };


  return (
    <div>
      <img className="logo" src={logo} />
      <div className="login">
        <div className="box">
          <h2>{signState}</h2>
          {signState === "Sign Up" && (
            <input 
              placeholder="   Your Name" 
              className="input1"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
          <input
            placeholder="   Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input1"
          />
          <input
            placeholder="   Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleSubmit} type="submit" disabled={loading}>
            {loading ? "Loading..." : signState}
          </button>
          <div className="remember">
            <div className="rem">
              <input type="checkbox"></input>
              <p>Remember me</p>
            </div>
            <p>Need Help ?</p>
          </div>
          <div className="sign-up">
            {signState === "Sign In" && (
              <p>
                New to Netflix?{" "}
                <span className="sign-col" onClick={ChangeState}>
                  Sign Up Now
                </span>
              </p>
            )}
            {signState === "Sign Up" && (
              <p>
                Already In Netflix?{" "}
                <span className="sign-col" onClick={ChangeState}>
                  Sign In Now
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default Login;
