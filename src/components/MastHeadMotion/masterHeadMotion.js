import React from "react";
import { Motion, spring } from 'react-motion';
import NavDownArrow from "../NavDownArrow/navDownArrow";

const MastHeadMotion = ({ bgImage, title, subtitle, desc, below, scrollTo, opacity, scale, endMotion }) => {
  //console.log(opacity, scale);
  return (
    <div className="mastheadMotion">
      <Motion 
        onRest={endMotion}
        defaultStyle={{ opacity: opacity, scale: scale }}
        style={{ opacity: spring(opacity), scale: spring(scale) }}
      >
      { style =>
        <div 
          className="masthead_bg" 
          style={{ backgroundImage: "url(" + bgImage + ")", transform: `scale(${style.scale})` }}
        >
          <div className="dim_layer"></div>
          <div className="masthead_header" style={{ opacity: style.opacity }}>
            <div className="masthead--title">{title}</div>
            <div className="masthead--subtitle">{subtitle}</div>
            <div className="masthead--desc">{desc}</div>
          </div>
          {
            below ?
            <div className="masthead--arrow">
              <NavDownArrow scrollTo={scrollTo} below={below} />
            </div> 
            : 
            null
          }
        </div>
      }
      </Motion>
    </div>
  );
};

export default MastHeadMotion;