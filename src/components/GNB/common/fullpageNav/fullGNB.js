import React from 'react';
import Element from "../element";
import "./fullGNB.scss";

const FullGNB = ({ menu, link, isActive, index, style }) => {
  return (
    <div className="fullGNB_wrapper">
      <Element
        name={'gnb'}
        menu={menu}
        style={style}
        key={index}
        link={link}
        isActive={isActive}
      />
    </div>
  )
}

export default FullGNB;