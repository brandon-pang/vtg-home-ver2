import React, { useState, useEffect } from 'react';
import { useModal } from '../../contexts/modal';
import ReactHtmlParser from 'react-html-parser';

import "./mobileHirelist.scss";

import midArrow from "../../assets/images/acsy/ic_arrow_mid_next.png";

const MobileHirelist = ({ title, department, location, index, openModal }) => {

  const [locationStyle, setColor] = useState({ color: '' });

  useEffect(() => {
    locationColor(location[0]);
  }, [])

  const locationColor = (location) => {
    if (location === "Seoul") {
      setColor({ color: '#EE3800' })
    } else if (location === "Vancouver") {
      setColor({ color: '#0082EE' })
    } else if (location === "Singapore") {
      setColor({ color: '#b847d0' })
    }
  }

  const modalOpen = (location, index) => {
    if (location == "Seoul") {
      openModal(index);
    } else if (location == "Vancouver") {      
      openModal(index);
    } else if (location == "Singapore") {
      openModal(index);
    }
  }
  return (
    <div className="mobile_list_wrapper" onClick={() => modalOpen(location, index)}>
      <div className="mobile_list_header">
        <div className="hire_title">{ReactHtmlParser(title)}</div>
        <img className="mid_arrow" src={midArrow} alt="mid arrow" />
      </div>
      <div className="mobile_list_body">
        <div className="hire_team">{ReactHtmlParser(department)}</div>
        <div className="hire_location" style={locationStyle}>{ReactHtmlParser(location)}</div>
      </div>
    </div>
  )
}

export default useModal(({ actions }) => ({
  openModal: actions.openModal,
}))(MobileHirelist);