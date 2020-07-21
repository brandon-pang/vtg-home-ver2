import React from "react";
import _ from "lodash";
import "./vgLifeBox.scss";

const VGLifeBox = ({ size, icon, title, list }) => {
  return (
    <div className={`life_box_${size}`}>
      <div className="box_icon">
        <img src={icon} alt="box_icon" />
      </div>
      <div className="life_box_title">{title}</div>
      <div className="life_box_list">
        {_.map(list, (element, index) => {
          return <div className="list_content" key={index}>{element}</div>;
        })}
      </div>
    </div>
  );
};

export default VGLifeBox;
