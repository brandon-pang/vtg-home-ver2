import React from "react";
import { NavLink } from "react-router-dom";

const Element = ({ name, menu, key_index, link, onClick }) => {
  return (
    <div className={`${name}_element`} key={key_index} onClick={onClick}>
      <NavLink to={link} activeClassName="selected">{menu}
        <div className="orange_bottom" />
      </NavLink>
    </div>
  );
};

export default Element;
