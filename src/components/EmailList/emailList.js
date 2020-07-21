import React from "react";
import RightArrowImage from "../../assets/images/acsy/ic_arrow_small_next.png";
import "./emailList.scss";

const EmailList = ({ mobileSize, title, address, index, isActive, emailOnClick }) => {
  return (
    <div className="email_container" >
      { title ? <div className="email_title">{title}</div> : null }
      <a 
        className="email_address_btn" 
        href={`mailto: ${address}`}
        style={isActive ? activeBorderStyle : null }
      >
        <div 
          className="email_address" 
          style={isActive ? activeFontStyle : null}
        >
          { mobileSize ? 'APPLY FOR THIS JOB' : address }
        </div>
        <div className="email_arrow">
          <img src={RightArrowImage} alt="rightArrow" />
        </div>
      </a>
    </div>
  );
};

const activeBorderStyle = {
  border: '1px solid #ff8300'
}
const activeFontStyle = {
  color: '#ff8300'
}

export default EmailList;
