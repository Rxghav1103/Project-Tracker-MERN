// ProgressCircle.js
import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Circle = ({ percentage }) => {
  return (
    <div style={{ width: "150px", margin: "0 auto" }}>
      <CircularProgressbar
        value={percentage}
        text={`${percentage}%`}
        styles={buildStyles({
          textSize: "16px",
          pathColor: "brown",
          textColor: "white",
          trailColor: "white",
          backgroundColor: "#3e98c7",
          width: "70%",
        })}
      />
    </div>
  );
};

export default Circle;
