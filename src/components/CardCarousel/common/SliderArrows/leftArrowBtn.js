import React from 'react';
import leftArrow from "../../../../assets/images/acsy/btn_boxarrow_r.png"
import "./leftArrowBtn.scss"

const LeftArrowBtn = ({ onClick }) => {
  return(
    <button className="leftArrow" onClick={onClick}>
      <img src={leftArrow} alt="Left Arrow"/>
    </button> 
  )
}

export default LeftArrowBtn;