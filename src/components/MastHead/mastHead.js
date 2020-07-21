import React from "react";
import NavDownArrow from "../NavDownArrow/navDownArrow";

const MastHead = ({ bgImage, title, subtitle, desc, below, scrollTo }) => {
  //console.log(scrollTo);
  return (
    <div
      className="masthead"
      style={{ backgroundImage: "url(" + bgImage + ")" }}
    >
      <div className="masthead--title">{title}</div>
      <div className="masthead--subtitle">{subtitle}</div>
      <div className="masthead--desc">{desc}</div>
      {
        below ? 
        <div className="masthead--arrow">
          <NavDownArrow scrollTo={scrollTo} below={below} />
        </div> : null
      }
      
    </div>
  );
};

export default MastHead;
