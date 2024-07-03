import React, { useState, useEffect } from "react";
import styles from "./App.module.css";

const InProgressList = ({ tasks, onMove, onDelete }) => {
  const [colors, setColors] = useState({});
  const [clickedGoals, setClickedGoals] = useState({});

  useEffect(() => {
    const initialColors = tasks.reduce((acc, task) => {
      acc[task.id] = getRandomColor();
      return acc;
    }, {});
    setColors(initialColors);
  }, [tasks]);

  const getRandomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const clickCheck = (id) => {
    setClickedGoals((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const moveTaskHandler = (taskId, targetStatus) => {
    onMove(taskId, "inProgress", targetStatus);
  };

  const deleteTaskHandler = (taskId) => {
    onDelete(taskId, "inProgress");
  };

  return (
    <div className={` ${styles["goal-list"]} ${styles["inprog"]}`}
    >
      <h2 style={{borderTop: "#f0ad4e 10px solid"}}>In Progress</h2>
      {tasks.map((task) => (
        <div
          key={task.id}
          className={styles["goal-item"]}
          style={{ borderLeftColor: colors[task.id], position: "relative" }}
        >
          <button
            onClick={() => deleteTaskHandler(task.id)}
            style={{
              position: "absolute",
              top: "5px",
              right: "5px",
              background: "none",
              border: "none",
              color: "black",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            X
          </button>
          <h3
            onClick={() => clickCheck(task.id)}
            style={{
              textAlignLast: "left",
            }}
          >
            {task.text}
          </h3>
          <p>{task.body}</p>
          <div className= {styles["button-container"]}
          >
            <button
              style={{ backgroundColor: "yellow" }}
              onClick={() => moveTaskHandler(task.id, "todo")}
            ></button>
            <button
              onClick={() => moveTaskHandler(task.id, "completed")}
            ></button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InProgressList;
