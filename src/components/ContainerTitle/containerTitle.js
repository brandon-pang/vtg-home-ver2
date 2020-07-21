import React from "react";
import ReactHtmlParser from 'react-html-parser';
import "./containerTitle.scss";

const ContainerTitle = ({ title, color }) => {
  return (
    <div className="title_container">
      <div className="line_wrapper">
        <div className={`line_start_${color}`} />
      </div>
      <div className="title">{ ReactHtmlParser(title) }</div>
    </div>
  );
};

export default ContainerTitle;
