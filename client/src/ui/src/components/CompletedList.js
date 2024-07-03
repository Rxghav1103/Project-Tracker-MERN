import React, { useState, useEffect } from "react";
import styles from "./App.module.css";

const CompletedList = ({ tasks, onMove, onDelete }) => {
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
    onMove(taskId, "completed", targetStatus);
  };

  const deleteTaskHandler = (taskId) => {
    onDelete(taskId, "completed");
  };

  return (
    <div className={`${styles["goal-list"]} ${styles["comp"]}`}>
      <h2 style={{borderTop: "teal 10px solid"}}>Completed</h2>
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
          <div className={styles["button-container"]}
          >
            <button
              style={{ backgroundColor: "yellow" }}
              onClick={() => moveTaskHandler(task.id, "todo")}
            ></button>
            <button
              style={{ backgroundColor: "orange" }}
              onClick={() => moveTaskHandler(task.id, "inProgress")}
            ></button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CompletedList;
