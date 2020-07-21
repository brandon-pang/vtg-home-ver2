import React from 'react';
import rightArrow from "../../../../assets/images/acsy/btn_num_l.png"
import "./rightArrowBtn.scss"

const RightArrowBtn = ({ onClick }) => {
  return(
    <button className="rightArrow" onClick={onClick}>
      <img src={rightArrow} alt="Right Arrow"/>
    </button>
  )
}

export default RightArrowBtn;