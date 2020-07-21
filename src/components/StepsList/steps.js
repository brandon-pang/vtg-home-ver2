import React from "react";
import _ from "lodash";
import "./steps.scss";

const Steps = ({ steps, index }) => {
  return (
    <div className={`steps_wrapper-${index}`}>
      {_.map(steps, (step, index) => {
        return <div className="step" key={index}>{step}</div>;
      })}
    </div>
  );
};

export default Steps;
