import React from "react";
import "./vgLifeList.scss";

const VGLifeList = ({ number, title, desc }) => {
  return (
    <div className="listContainer">
      <div className="list_header">
        <div className="list_number">{number}</div>
        <div className="list_title">{title}</div>
      </div>
      <div className="list_desc">{desc}</div>
    </div>
  );
};

export default VGLifeList;
