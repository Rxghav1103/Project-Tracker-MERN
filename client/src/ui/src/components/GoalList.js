import React, { useState, useEffect } from "react";

const GoalList = (props) => {
  const getRandomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const [colors, setColors] = useState({});
  const [clickedGoals, setClickedGoals] = useState({});

  useEffect(() => {
    const initialColors = props.goals.reduce((acc, goal) => {
      acc[goal.id] = getRandomColor();
      return acc;
    }, {});
    setColors(initialColors);
  }, [props.goals]);

  const clickCheck = (id) => {
    setClickedGoals((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <ul className="goal-list">
      {props.goals.map((res) => {
        const isClicked = clickedGoals[res.id];
        return (
          <li key={res.id} style={{ borderLeftColor: colors[res.id] }}>
            <h3
              onClick={() => clickCheck(res.id)}
              style={{ textDecoration: isClicked ? "line-through" : "none" }}
            >
              {res.text}
            </h3>
            <p>{res.body}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default GoalList;
