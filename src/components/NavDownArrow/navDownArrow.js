import React from "react";
import downArrow_white from "../../assets/images/acsy/ic_arrowscroll_w.png";
import downArrow_black from "../../assets/images/acsy/ic_arrowscroll_b.png";

const NavDownArrow = ({ below, scrollTo, black }) => {
  return (
    <button className="navDownContainer" onClick={() => scrollTo(below)}>
      {black ? 
        <img src={downArrow_black} alt="downArrow" /> : 
        <img src={downArrow_white} alt="downArrow" />
      }
    </button>
  );
};

export default NavDownArrow;
