import React from 'react';
import scrollArrow from "../../assets/images/acsy/ic_arrowscroll_top_b.png"
import "./navToTop.scss";

const NavToTop = ({ scrollTo, top }) => {
  return (
    <div className="toTop_container">
      <button className="toTopBtn" onClick={() => scrollTo(top)}>
        <img src={scrollArrow} alt="scroll top" />
        <div className="top">TOP</div>
      </button>
    </div>
  )
}

export default NavToTop;