import React, { useState } from 'react';

// image
import earthImg_white from "../../assets/images/acsy/ic_global_white.png";

import "./langMenu.scss";

const LangMenu = (props) => {
  const [isMenuReveal, setMenu] = useState(false);

  const onEnter = () => {
    setMenu(true);
  }
  const onLeave = () => {
    setMenu(false);
  }
  return (
    <div
      className="PopupMenu"
      aria-expanded={isMenuReveal}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div className="PopupMenu__inner">
        <button
          type="button"
          aria-haspopup="true"
          aria-controls={props.id}
          className="PopupMenu__Button"
        >
          <img className="earthImg" src={earthImg_white} alt="globe" />
          {props.title}
        </button>
        <div
          id={props.id}
          className={`PopupMenu__Menu -${props.position}`}
          aria-hidden={!isMenuReveal}
          aria-label={props.menuLabel}
        >
          {props.children}
        </div>
      </div>
    </div>
  )
}

export default LangMenu;