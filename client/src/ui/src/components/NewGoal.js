import React, { useState } from "react";
import styles from "./NewGoal.module.css"; // Ensure your CSS file path is correct

const NewGoal = ({ onAdd }) => {
  const [enteredText, setEnteredText] = useState("");
  const [enteredDescription, setEnteredDescription] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("todo");
  const [isHovered, setIsHovered] = useState(false);

  const textChangeHandler = (event) => {
    setEnteredText(event.target.value);
  };

  const descriptionChangeHandler = (event) => {
    setEnteredDescription(event.target.value); // Update description state
  };

  const statusChangeHandler = (event) => {
    setSelectedStatus(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (enteredText.trim().length === 0) {
      return;
    }
    onAdd({ text: enteredText, body: enteredDescription }, selectedStatus); // Pass both text and description to onAdd
    setEnteredText("");
    setEnteredDescription(""); // Clear description after submission
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <form className={styles.newGoal} onSubmit={submitHandler}>
      <input
        className={styles.taskname}
        type="text"
        value={enteredText}
        onChange={textChangeHandler}
        placeholder="Enter Task Name ..."
      />
      <input
        className={styles.taskname}
        type="text"
        value={enteredDescription}
        onChange={descriptionChangeHandler}
        placeholder="Enter Task Description ..."
      />
      <div>
        <select
          className={styles.taskselect}
          id="status"
          value={selectedStatus}
          onChange={statusChangeHandler}
        >
          <option value="todo">To-Do</option>
          <option value="inProgress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <button
        className={styles.submitbutton}
        style={{ backgroundColor: isHovered ? "white" : "#95D2B3" }}
        type="submit"
        onMouseOver={handleMouseEnter}
        onMouseOut={handleMouseLeave}
      >
        Add Task
      </button>
    </form>
  );
};

export default NewGoal;
