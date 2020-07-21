import React from 'react';
import Element from "../element";
import "./mobileGNB.scss";

const MobileGNB = ({ menu, link, isActive, index, onClick, style }) => {
  return (
    <div className="mobileGNB_wrapper">
      <Element
        name={"mobile"}
        menu={menu}
        style={style}
        key={index}
        link={link}
        onClick={onClick}
      />
    </div>
  )
}

export default MobileGNB;