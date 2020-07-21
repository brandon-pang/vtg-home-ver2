import React from "react";
import { useLanguage } from "../../contexts/locale";
import _ from "lodash";
import { Link } from "react-router-dom";

import FooterMenu from "../GNB/common/element";
import VertigoLogoImage from "../../assets/images/acsy/vertigogames_b.png";
import FacebookLogoImage from "../../assets/images/acsy/ic_sns2_facebook_fade.png";
//import TwitterLogoImage from "../../assets/images/acsy/ic_sns2_twitter_fade.png";
import earthImg from "../../assets/images/acsy/ic_global_gray.png";
import langUpArrow from "../../assets/images/acsy/ic_arrow_l_gray_up.png";
import "./footer.scss";

const Footer = ({ localeLang, setLang }) => {
  const langContainer = (localeLang) => {
    if (localeLang === 'ko') {
      return 'KO'
    } else {
      return 'EN'
    }
  }
  const updownArrow = () => {
    if (localeLang === 'ko') {
      return <img className="lang_down" src={langUpArrow} alt="lang down arrow"></img>
    } else {
      return <img className="lang_up" src={langUpArrow} alt="lang up arrow"></img>
    }
  }
  const handleLangChange = () => {
    if (localeLang === 'ko') {
      setLang('en-US');
    } else if (localeLang === 'en-US') { 
      setLang('ko');
    }
  }
  return (
    <div
      className="footer_container"
      ref={footerDiv => { this.footerDiv = footerDiv; }}
    >
      <div className="footer_first_row">
        <div className="vertigo_logo">
          <Link to="/">
            <img src={VertigoLogoImage} alt="vertigo_logo" />
          </Link>
        </div>
        <div className="vertigo_footer_first_row_container">
          <div className="vertigo_footer_menu">
            {_.map(menu_name, ({ name, link }, index) => {
              return (
                <FooterMenu
                  name={"footer"}
                  menu={name}
                  key={index}
                  link={link}
                />
              );
            })}
          </div>
          <div className="current_lang_container" onClick={handleLangChange}>
            <img className="earth_icon" src={earthImg} alt="earthImg" />
            <p className="current_lang">{langContainer(localeLang)}</p>
            {updownArrow()}
          </div>
        </div>
      </div>
      <div className="footer_second_row">
        <div className="trade_right_wrapper">
          <div className="footer_trade_marks">
            All trademarks referenced herein are the properties of their
            respective owners.
            </div>
          <div className="footer_right">
            ©2017 Vertigo Games Inc. All Rights Reserved
            </div>
        </div>
        <div className="sns_wrapper">
          <a className="sns_facebook" href="https://www.facebook.com/vertigogamesinc/?ref=br_rs" target="_blank" rel="noopener noreferrer">
            <img src={FacebookLogoImage} alt="facebook" />
          </a>
          {/* <div className="sns_twitter">
              <img src={TwitterLogoImage} alt="twitter" />
            </div> */}
        </div>
      </div>
    </div>
  )
}

const menu_name = [
  {
    name: "About Us",
    link: "/about"
  },
  {
    name: "Games",
    link: "/game"
  },
  {
    name: "News",
    link: "/news"
  },
  {
    name: "Careers",
    link: "/careers"
  },
  {
    name: "Contacts",
    link: "/contacts"
  }
];

export default useLanguage(({ state, actions }) => ({
  localeLang: state.lang,
  setLang: actions.setLang
}))(Footer);