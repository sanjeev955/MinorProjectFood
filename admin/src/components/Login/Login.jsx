import React, { useContext, useEffect, useState } from "react";
import "./Login.css";
import { toast } from "react-toastify";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const Login = ({ url }) => {
  const navigate = useNavigate();
  const { admin, setAdmin, token, setToken } = useContext(StoreContext);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();
    console.log("Login attempt with email:", data.email); // Log the email being used for login
    console.log("API URL:", url + "/api/user/login"); // Log the API URL for debugging

    try {
      const response = await axios.post(url + "/api/user/login", data);
      console.log("Response received:", response.data); // Log the response for debugging

      if (response.data.success) {
        if (response.data.role === "admin") {
          setToken(response.data.token);
          setAdmin(true);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("admin", true);
          toast.success("Login Successfully");
          navigate("/add");
        } else {
          toast.error("You are not an admin");
        }
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Login error:", error); // Log the error for debugging
      toast.error("An error occurred during login. Please try again.");
    }
  };

  useEffect(() => {
    if (admin && token) {
      navigate("/add");
    }
  }, [admin, token, navigate]);

  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>Login</h2>
        </div>
        <div className="login-popup-inputs">
          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Your email"
            required
          />
          <input
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder="Your password"
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;