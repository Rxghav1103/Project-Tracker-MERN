import React from "react";
import styles from "./App.module.css"; // Make sure to create a CSS file for styling

const Header = ({ onHomeClick, onChangeProjectClick, onLogoutClick }) => {
  return (
    <div className={styles.header}>
      <div className={styles.header}>
        <h1>Project Tracker</h1>
      </div>
      <div className={styles["header-right"]}>
        <button onClick={onHomeClick}>Home Page</button>
        <button onClick={onChangeProjectClick}>Change Project</button>
        <button onClick={onLogoutClick}>Logout</button>
      </div>
    </div>
  );
};

export default Header;
