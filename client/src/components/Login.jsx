import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
// import login from "../assets/login.svg";
import styles from "../css/Login.module.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isloggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLoggedIn(true);
      navigate("/");
    }
  }, [isloggedIn, navigate]);

  const [contact, setContact] = useState({
    fName: "",
    lName: "",
    email: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setContact(prevValue => {
      return {
        ...prevValue,
        [name]: value
      };
    });
  }

  const handleSubmit = async () => {
    const response = await fetch("http://localhost:5555/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.status === 200) {
      const data = await response.json();
      localStorage.setItem("token", data);
      window.location.reload();



    } else {
      const data = await response.json();
      alert(data.message);
    }

    console.log(username, password);
  };

  return (
    <div className={styles.main}>
      {/* <img src={login} alt="" /> */}
      <div className={styles.container}>
        <h1>User Login</h1>
        <p>Enter your details to sign in to your account</p>
          <div className={styles.form}>
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
            <button onClick={handleSubmit} disabled={isloggedIn}>
              Submit
            </button>
            <p>New? Try Signing in: <Link to="/signup">Here</Link> </p>
          </div>
      </div>
    </div>
  );
};

export default Login;
