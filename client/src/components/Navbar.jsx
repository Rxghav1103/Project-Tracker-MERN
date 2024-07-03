import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import {useParams} from 'react-router-dom'

import styles from "../css/Navbar.module.css"

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLoggedIn(true);
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    if (localStorage.getItem("token")) {
      localStorage.removeItem("token");
      window.location.reload();
    }
  };

  const curr = window.location.href.substring(27,window.location.href.length);

  const isTask = window.location.href.includes("task");

  // console.log( isTask , curr);
  // console.log(window.location.href.substring(27,window.location.href.length));
  // let header = "Project Tracker";

  const [header,setHeader ] = useState('Project Tracker')
  useEffect(() => {
    const fetchData = async () => {
      if (isTask) {
        try {
          const response = await fetch("http://localhost:5555/project/getName", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: curr }),
          });
  
          if (response.status === 200) {
            const data = await response.json();
            setHeader(`Project Tracker - ${data.name}`);
          } else {
            const data = await response.json();
            alert(data.message);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }
    };
  
    fetchData();
  }, [isTask, curr]);
  

  return (
    <div className={styles.header}>
      <div className={styles.headerleft}>
      <h1  onClick={() => navigate("/")}>{header}</h1>
      </div>
      <div className={styles.headerright}>
        {isLoggedIn && <button  onClick={handleLogout}>Logout</button>}
        {!isLoggedIn && (
            <NavLink to="/login">Login</NavLink>
        )}
        {!isLoggedIn && (
            <NavLink to="/signup">Signup</NavLink>
        )}
      </div>
    </div>
  );
};

export default Navbar;
