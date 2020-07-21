import React from "react";
import "./numberingBox.scss";

const NumberingBox = ({ name, number, title, desc }) => {
  return (
    <div className="numberBox_wrapper">
      <div className="top_wrapper">
        <div className={name}>{number}</div>
        <div className="title">{title}</div>
      </div>
      <div className="desc">{desc}</div>
    </div>
  );
};

export default NumberingBox;
