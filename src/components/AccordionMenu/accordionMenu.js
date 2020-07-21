import React, { useState, useEffect } from 'react';
import ReactHtmlParser from 'react-html-parser';
import downArrow from "../../assets/images/acsy/ic_arrow_mid2_blk_down.png";
import RightArrowImage from "../../assets/images/acsy/ic_arrow_small_next.png";
import "./accordionMenu.scss";

const menuOpenStyle = {
  marginBottom: 0,
  borderRadius: '5px 5px 0px 0px',
}

const AccordionMenu = ({ hirePosition, title, content, department, location }) => {

  const [isMenuOpen, setMenu] = useState(false);
  const [height, setHeight] = useState(0);
  const [opacity, setOpacity] = useState(0);
  const [display, setDisplay] = useState('none');
  const [locationStyle, setColor] = useState({ color: '' });
  const [mailTo, setMailTo] = useState('');

  useEffect(() => {
    //console.log(hirePosition);
    changeEmail(location[0]);
  }, [])

  const openMenu = () => {
    setMenu(!isMenuOpen);
    if (height === 0) {
      setHeight('100%');
      setOpacity(1);
      setDisplay('block');
    } else if (height === '100%') {
      setHeight(0);
      setOpacity(0);
      setDisplay('none');
    }
  }

  const changeEmail = (location) => {
    if (location === "Seoul") {
      setColor({ color: '#EE3800' });
      setMailTo('mailto:job@vertigogames.com');
    } else if (location === "Vancouver") {
      setColor({ color: '#0082EE' });
      setMailTo('mailto:vancouver.hr@vertigogames.com');
    } else if (location === "Singapore") {
      setColor({ color: '#b847d0' });
      setMailTo('mailto:job@vertigogames.com');
    }
  }


  return (
    <div className="accordion_master_wrapper">
      <button
        className="accordion_wrapper"
        onClick={() => openMenu()}
        style={isMenuOpen ? menuOpenStyle : {}}
      >
        <div className="accordion_header">{ReactHtmlParser(title)}</div>
        <div className="accordion_subHeader">{department}</div>
        <div className="accordion_location" style={locationStyle}>{location}</div>
        <div className="accordion_arrow_wrapper" style={isMenuOpen ? { transform: 'rotate(0deg)' } : { transform: 'rotate(180deg)' }}>
          <img className="accordion_arrow_down" src={downArrow} alt="down Arrow" />
        </div>
      </button>

      <div className="accordion_contents_container" style={{ transition: 'opacity 0.3s ease', height: height, opacity: opacity }}>
        <div className="contents_wrapper" style={{ display: display }}>
          <div className="contents">{ReactHtmlParser(content)}</div>
          <a className="applyBtn_wrapper" href={mailTo}>
            <p className="email_address">apply now</p>
            <img className="email_arrow" src={RightArrowImage} alt="rightArrow" />
          </a>
        </div>
      </div>
    </div>
  )
}

export default AccordionMenu;