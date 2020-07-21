import React from 'react';
import { useLanguage } from "../../contexts/locale";
import LangMenu from "./langMenu";

// style
import "./langNav.scss";
// assets
import checkmark_w from "../../assets/images/acsy/ic_check_gnb_l_w.png";
import checkmark_g from "../../assets/images/acsy/ic_check_gnb_l_gray.png";
import checkmark_blk from "../../assets/images/acsy/ic_check_gnb_l_blk.png";

const LangNav = ({ localeLang, setLang, tabletSize, mobileSize, closeMenu }) => {
  const langContainer = (localeLang) => {
    if (localeLang.includes('ko')) {
      return 'KO'
    } else {
      return 'EN'
    }
  }
  const handleLangChange = (lang) => {
    if (lang.includes('ko')) {
      setLang('ko');
    } else {
      setLang('en-US');
    }
    closeMenu();
  }
  return (
    
    <div className="languageNav">
      {tabletSize || mobileSize
        ?
        <div className="tablet_mobile_container">
          <ul className="tm_langMenu">
            <li onClick={() => handleLangChange('ko')}>
              {localeLang.includes('ko') ? <img className="checkmark" src={checkmark_w} alt="check" /> : <img className="checkmark" src={checkmark_g} alt="check" />}
              <button type="button" style={localeLang.includes('ko') ? mobile_langButtonActive : mobile_langbuttonInActive}>Korean</button>
            </li>
            <li onClick={() => handleLangChange('en')}>
              {localeLang.includes('en') ? <img className="checkmark" src={checkmark_w} alt="check" /> : <img className="checkmark" src={checkmark_g} alt="check" />}
              <button type="button" style={localeLang.includes('en') ? mobile_langButtonActive : mobile_langbuttonInActive}>English</button>
            </li>
          </ul>
        </div>
        :
        <LangMenu
          className="locale_container"
          id="PopupMenuUnder"
          menuLabel="Menu Under"
          title={langContainer(localeLang)}
          position="under"
        >
          <ul className="langMenu">
            <li onClick={() => handleLangChange('ko')}>
              {localeLang.includes('ko') ? <img className="checkmark" src={checkmark_blk} alt="check" /> : <div className="checkmark" />}
              <button type="button" style={localeLang.includes('ko') ? langbuttonActive : langButtonInactive}>Korean</button>
            </li>
            <li onClick={() => handleLangChange('en-US')}>
              {localeLang.includes('en') ? <img className="checkmark" src={checkmark_blk} alt="check" /> : <div className="checkmark" />}
              <button type="button" style={localeLang.includes('en') ? langbuttonActive : langButtonInactive}>English</button>
            </li>
          </ul>
        </LangMenu>
      }
    </div>
  )
}

const langbuttonActive = {
  color: '#1c1c1c',
  fontWeight: 500
}
const langButtonInactive = {
  color: '#858585',
  fontWeight: 500
}

const mobile_langbuttonInActive = {
  color: '#1c1c1c',
  fontWeight: 500
}
const mobile_langButtonActive = {
  color: '#858585',
  fontWeight: 500
}

export default useLanguage(({ state, actions }) => ({
  localeLang: state.lang,
  setLang: actions.setLang
}))(LangNav);