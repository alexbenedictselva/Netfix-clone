import React, { useState } from "react";
import "./Login.css";
import logo from "../../../assets/logo.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";



const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signState, setSignState] = useState("Sign In");
  const [error, setError] = useState({ email: "", password: "" });
  const navigate = useNavigate();


  const ChangeState = () => {
    signState === "Sign In" ? setSignState("Sign Up") : setSignState("Sign In");
  };
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email + " " + password);
    let valid = true;
    if (!emailRegex.test(email)) {
      valid = false;
    }
    if (!passwordRegex.test(password)) {
      valid = false;
    }
    if (valid) {
      navigate("/");
    } else {
      alert("error");
    }
  };


  return (
    <div>
      <img className="logo" src={logo} />
      <div className="login">
        <div className="box">
          <h2>{signState}</h2>
          {signState === "Sign Up" && (
            <input placeholder="   Your Name" className="input1"></input>
          )}
          <input
            placeholder="   Email"
            onChange={(e) => setEmail(e.target.value)}
            className="input1"
          ></input>
          <input
            placeholder="   Password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <button onClick={handleSubmit} type="submit">
            {/* <Link to="/" className="link"> */}
            Sign In
            {/* </Link> */}
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
