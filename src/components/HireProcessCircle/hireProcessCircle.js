import React from "react";
import "./hireProcessCircle.scss";

const HireProcessCircle = ({ size, number, desc }) => {
  return (
    <div className={`circle_wrapper_${size}`}>
      <div className="circle_inside">
        <div className="circle_number">{number}</div>
        <div className="circle_desc">{desc}</div>
      </div>
    </div>
  );
};

export default HireProcessCircle;
