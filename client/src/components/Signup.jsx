import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../css/Login.module.css";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [name, setName] = useState("");
  const [headingText, setHeading] = useState("");
  
  function handleChange(event) {
    console.log(event.target.value);
    setName(event.target.value);
    setHeading(name);
  }

  function handleClick(event) {
    event.preventDefault();
  }

  const navigate = useNavigate();

  const validateCredentials = (username, password) => {
    if (username.length < 3) {
      return "Username must be at least 3 characters long";
    }
    if (!password) {
      return "Password cannot be empty";
    }
    if (password.length < 8 || password.length > 16) {
      return "Password must be between 8 and 16 characters long";
    }
    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one uppercase letter";
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      return "Password must contain at least one special character";
    }
    return null;
  };

  const handleSignup = async () => {
    const errorMessage = validateCredentials(username, password);
    if (errorMessage) {
      alert(errorMessage);
      return;
    }

    const response = await fetch("http://localhost:5555/user/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, username, password }),
    });

    if (response.status === 200) {
      alert("Account created Successfully!");
      navigate("/login");
    } else {
      const data = await response.json();
      alert(data.message);
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <h1>Hello {headingText}</h1>
        <p>Enter your details to create a new account</p>
        <div className={styles.form}>
          <label htmlFor="">Email</label>
          <input
            style={{
              background: "white"
          }}
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <label htmlFor="">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              handleChange(e);
            }}
          />
          <label htmlFor="">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button onClick={handleSignup}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
