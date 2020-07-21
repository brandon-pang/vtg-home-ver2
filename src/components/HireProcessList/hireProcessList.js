import React from 'react';
import StepList from "../StepsList/steps";
import "./hireProcessList.scss";

const HireProcessList = ({ number, title, steps }) => {
  return(
    <div className="hire_list_wrapper">
      <div className="hire_header">
        <div className="number">{number}</div>
        <div className="title">{title}</div>
      </div>
      <div className="hire_list">
        <StepList steps={steps} />
      </div>
    </div>
  )
}

export default HireProcessList;