import React from "react";
import ReactHtmlParser from 'react-html-parser';
import "./aboutBox.scss";

const AboutBox = ({ title, imgName }) => {
  return (
    <div className="box_container">
      <div className="box-title">
        { ReactHtmlParser(title) }
      </div>
      <div className="box-img">
        <img src={imgName} alt="img" />
      </div>
    </div>
  );
};

export default AboutBox;
