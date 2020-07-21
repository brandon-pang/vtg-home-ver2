import React from "react";
import papayaLogo from "../../assets/images/acsy/logo_papayaplay.png";
import rightArrow from "../../assets/images/acsy/ic_arrow_mid_wh_next.png";
import "./papayaBtn.scss";

const PapayaBtn = ({ json } ) => {
  return ( 
    <a className="btn_container" href="https://www.papayaplay.com/portal.do" target="_blank" rel="noopener noreferrer">
      <img className="papayaLogo" src={papayaLogo} alt="papaya_logo" />
      <p>{json}</p>
      <img className="right_arrow" src={rightArrow} alt="right_arrow" />
    </a>
  );
};

export default PapayaBtn;
