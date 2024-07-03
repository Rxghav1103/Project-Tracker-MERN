import React, { useEffect, useState } from "react";
import Circle from "./components/Circle";
import NewGoal from "./components/NewGoal";
import TodoList from "./components/TodoList";
import InProgressList from "./components/InProgressList";
import CompletedList from "./components/CompletedList";
import Header from "./components/Header";
import styles from "./components/App.module.css";

import { useParams } from "react-router-dom";

export default function ProjectTracker() {
  const [todoTasks, setTodoTasks] = useState([]);
  const [inProgressTasks, setInProgressTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  const { pid } = useParams();
  // console.log(pid);

  useEffect(() => {
    if (localStorage.getItem("project") !== pid) {
      // localStorage.setItem("project", pid)
      alert("You are not authorized to view this project");
      window.location.href = "/";
    }

    fetch("http://localhost:5555/project/get/" + pid, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data?.project?.toDo);

        setTodoTasks(data.project.toDo);
        setInProgressTasks(data.project.inProgress);
        setCompletedTasks(data.project.completed);
      });
  }, [pid]);

  // console.log();

  const addTask = async (newTask, status) => {
    let id = Math.random().toString();
    const response = await fetch("http://localhost:5555/project/add/" + pid, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: status,
        text: newTask.text,
        body: newTask.body,
        id,
      }),
    });

    if (response.status === 200) {
      const data = await response.json();
      if (status === "todo") {
        setTodoTasks(data.project.toDo);
      } else if (status === "inProgress") {
        setInProgressTasks(data.project.inProgress);
      } else if (status === "completed") {
        setCompletedTasks(data.project.completed);
      }
    } else {
      const data = await response.json();
      alert(data.message);
    }
  };

  const moveTask = async (taskId, sourceStatus, targetStatus) => {
    // "source: todo" -> "target: completed"
    // "target: add" -> "source: delete"

    const response = await fetch("http://localhost:5555/project/move/" + pid, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: taskId,
        source: sourceStatus,
        target: targetStatus,
      }),
    });

    if (response.status !== 200) {
      alert("Task not moved");
    }
    if (response.status === 200) {
      window.location.reload()
    }
    
    
  };

  const deleteTask = async (taskId, sourceStatus) => {
    const response = await fetch(
      "http://localhost:5555/project/delete/" + pid,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type: sourceStatus, id: taskId }),
      }
    );

    if (response.status !== 200) {
      alert("Task not deleted");
    }
    if (response.status === 200) {
      const data = await response.json();

      if (sourceStatus === "todo") {
        setTodoTasks(data.project.toDo);
      } else if (sourceStatus === "inProgress") {
        setInProgressTasks(data.project.inProgress);
      } else {
        setCompletedTasks(data.project.completed);
      }

      // console.log(data);
    }
  };

  const totalTasks =
    todoTasks.length + inProgressTasks.length + completedTasks.length;
  const completedPercentage = totalTasks
    ? Math.round((completedTasks.length / totalTasks) * 100)
    : 0;

  return (
    <div>
      <div
        className={styles.App}
        style={{ marginTop: "30px", display: "flex" }}
      >
        <div className={styles["leftitems"]}>
          <h1 style={{ color: "white" }}>Task Manager</h1>
          <NewGoal onAdd={addTask} />
          <div className={styles["progress-circle-container"]}>
            <Circle percentage={completedPercentage} />
            <div className={styles["stats"]}>
              <p style={{ color: "white" }}>
                {completedTasks.length} of {totalTasks} completed successfully
              </p>
            </div>
          </div>
        </div>
        <div className={styles["rightitems"]}>
          <div
            style={{ display: "inline-flex" }}
            className={styles["lists-container"]}
          >
            <TodoList
              tasks={todoTasks}
              onMove={moveTask}
              onDelete={deleteTask}
            />
            <InProgressList
              tasks={inProgressTasks}
              onMove={moveTask}
              onDelete={deleteTask}
            />
            <CompletedList
              tasks={completedTasks}
              onMove={moveTask}
              onDelete={deleteTask}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
